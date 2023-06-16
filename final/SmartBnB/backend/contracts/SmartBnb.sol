// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.18 <0.9.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract SmartBnb is Ownable {
    uint256 public listingFee;
    uint256 private rentalIds;

    struct RentalInfo {
        uint256 id;
        address owner;
        string name;
        string city;
        string lat;
        string long;
        string description;
        string imgUrl;
        uint256 maxGuests;
        uint256 pricePerDay;
    }

    struct Booking {
        address renter;
        uint256 fromTimestamp;
        uint256 toTimestamp;
    }

    RentalInfo[] public rentals;

    mapping(uint256 => Booking[]) rentalBookings;

    //--------------------------------------------------------------------
    // EVENTS

    // event NewRentalCreated(
    //     uint256 id,
    //     address owner,
    //     string name,
    //     string city,
    //     string latitude,
    //     string longitude,
    //     string description,
    //     string imgUrl,
    //     uint256 maxGuests,
    //     uint256 pricePerDay,
    //     uint256 timestamp
    // );

    // event NewBookAdded(
    //     uint256 rentalId,
    //     address renter,
    //     uint256 bookDateStart,
    //     uint256 bookDateEnd,
    //     uint256 timestamp
    // );

    //--------------------------------------------------------------------
    // MODIFIERS

    modifier isRental(uint _id) {
        require(_id < rentalIds, "Invalid id");
        _;
    }

    //--------------------------------------------------------------------
    // CONSTRUCTOR

    constructor(uint256 _listingFee) {
        listingFee = _listingFee;
    }

    //--------------------------------------------------------------------
    // FUNCTIONS

    function addRental(
        string memory _name,
        string memory _city,
        string memory _lat,
        string memory _long,
        string memory _description,
        string memory _imgUrl,
        uint256 _maxGuests,
        uint256 _pricePerDay
    ) external payable {
        require(msg.value >= listingFee, "Insufficient fee");

        RentalInfo memory rental = RentalInfo(
            rentalIds,
            msg.sender,
            _name,
            _city,
            _lat,
            _long,
            _description,
            _imgUrl,
            _maxGuests,
            _pricePerDay
        );

        rentals.push(rental);
        rentalIds++;

        // emit NewRentalCreated(
        //     _rentalId,
        //     msg.sender,
        //     _name,
        //     _city,
        //     _lat,
        //     _long,
        //     _description,
        //     _imgUrl,
        //     _maxGuests,
        //     _pricePerDay,
        //     block.timestamp
        // );
    }

    function bookDates(
        uint256 _id,
        uint256 _fromDateTimestamp,
        uint256 _toDateTimestamp
    ) external payable isRental(_id) {
        RentalInfo memory rental = rentals[_id];

        uint256 bookingPeriod = (_toDateTimestamp - _fromDateTimestamp) /
            1 days;
        require(bookingPeriod >= 1, "Can't book less than 1 day");

        require(
            (rental.pricePerDay * bookingPeriod) == msg.value,
            "Insufficient amount"
        );

        require(
            !checkIfBooked(_id, _fromDateTimestamp, _toDateTimestamp),
            "Already booked"
        );

        rentalBookings[_id].push(
            Booking(msg.sender, _fromDateTimestamp, _toDateTimestamp)
        );

        (bool sent, ) = payable(rental.owner).call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        // emit NewBookAdded(
        //     _id,
        //     msg.sender,
        //     _fromDateTimestamp,
        //     _toDateTimestamp,
        //     block.timestamp
        // );
    }

    function checkIfBooked(
        uint256 _id,
        uint256 _fromDateTimestamp,
        uint256 _toDateTimestamp
    ) internal view returns (bool) {
        Booking[] memory _rentalBookings = rentalBookings[_id];

        // Make sure the rental is available for the booking dates
        for (uint256 i = 0; i < _rentalBookings.length; ) {
            if (
                ((_fromDateTimestamp >= _rentalBookings[i].fromTimestamp) &&
                    (_fromDateTimestamp <= _rentalBookings[i].toTimestamp)) ||
                ((_toDateTimestamp >= _rentalBookings[i].fromTimestamp) &&
                    (_toDateTimestamp <= _rentalBookings[i].toTimestamp))
            ) {
                return true;
            }
            unchecked {
                ++i;
            }
        }
        return false;
    }

    function getRentals() external view returns (RentalInfo[] memory) {
        return rentals;
    }

    // Return the list of bookings for a given rental
    function getRentalBookings(
        uint256 _id
    ) external view isRental(_id) returns (Booking[] memory) {
        return rentalBookings[_id];
    }

    function getRentalInfo(
        uint256 _id
    ) external view isRental(_id) returns (RentalInfo memory) {
        return rentals[_id];
    }

    // ADMIN FUNCTIONS

    function changeListingFee(uint256 _newFee) external onlyOwner {
        listingFee = _newFee;
    }

    function withdrawBalance() external onlyOwner {
        (bool sent, ) = payable(msg.sender).call{value: address(this).balance}(
            ""
        );
        require(sent, "Failed to send Ether");
    }
}
