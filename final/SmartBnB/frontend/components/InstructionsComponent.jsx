import styles from "../styles/InstructionsComponent.module.css";
import { useSigner, useBlockNumber } from "wagmi";
import { useState, useEffect } from "react";
import contractJson from "../assets/SmartBnb.json";
import { ethers } from "ethers";
import React from "react";
import { Select, DatePicker, Input, Button } from "web3uikit";

const contractAddress = "0x5712DE56c5E00CE7223D6554617700B988DA1E5D";

export default function InstructionsComponent() {
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <h1>Smart BnB</h1>
      </header>
      <div className={styles.buttons_container}>
        <PageBody></PageBody>
      </div>
      <div className={styles.footer}>SmartBnB</div>
    </div>
  );
}

function PageBody() {
  return (
    <>
      <ContractAddress></ContractAddress>
	    <Home></Home>
    </>
  );
}

function ContractAddress() {
  const { data: signer } = useSigner();
  return (
    <>
      <h1>This contract is on Goerli Testnet</h1>
      <p>contract address: {contractAddress}</p>
      {console.log(signer)}
    </>
  );
}

function CheckState() {
  const [currentBlockDate, setCurrentBlockDate] = useState();
  const [closingTimeDate, setClosingTimeDate] = useState();
  const [check, setCheck] = useState();
  const [contract, setContract] = useState();
  const [isLoading, setLoading] = useState();
  const { data: signer } = useSigner();

  useEffect(() => {
    if (signer) {
      const contract = new ethers.Contract(contractAddress, contractJson.abi, signer.provider);
      setContract(contract);
    }
  }, [signer]);

  async function getCheckState() {
    setLoading(true);
    const state = await contract.connect(signer).betsOpen();
    setCheck(state);
    const provider = contract.provider;
    const currentBlock = await provider.getBlock("latest");
    const currentBlockDate = new Date(currentBlock.timestamp * 1000);
    setCurrentBlockDate(currentBlockDate);
    const closingTime = await contract.connect(signer).betsClosingTime();
    const closingTimeDate = new Date(closingTime.toNumber() * 1000);
    setClosingTimeDate(closingTimeDate);
    setLoading(false);
  }

  return (
    <>
      <h3>Query State</h3>
      {!signer ? (
        <p style={{ color: "red", fontWeight: "bold" }}> Please connect wallet</p>
      ) : (
        <button onClick={() => { getCheckState(); }}>
          {isLoading ? `Checking status...` : `Check`}
        </button>
      )}
      {isLoading}
      {check === undefined ? null : (
        <>
          {check ? (
            <>
              <h1>The lottery is open!!!</h1>
              <h1>The last block was mined at{" "}
                {currentBlockDate.toLocaleDateString()} :{" "} {currentBlockDate.toLocaleTimeString()}
              </h1>
              <h1>Lottery should close at{" "} 
                {closingTimeDate.toLocaleDateString()} :{" "} {closingTimeDate.toLocaleTimeString()}
              </h1>
            </>
          ) : (
            <h1>The lottery is closed !!!</h1>
          )}
        </>
      )}
    </>
  );
}

function OpenBets() {
  const [txData, setTxData] = useState();
  const [contract, setContract] = useState();
  const [isLoading, setLoading] = useState();
  const [duration, setDuration] = useState();
  const { data: signer } = useSigner();
  const handleChange = (event) => {
	  setDuration(event.target.value);
	};

  useEffect(() => {
    if (signer) {
      const contract = new ethers.Contract(contractAddress, contractJson.abi, signer.provider);
      setContract(contract);
    }
  }, [signer]);

  async function setOpenBets() {
    setLoading(true);
    const provider = contract.provider;
    const currentBlock = await provider.getBlock("latest");
    const tx = await contract.connect(signer).openBets(currentBlock.timestamp + Number(duration));
    const data = await tx.wait();
    setTxData(data);
    setLoading(false);
  }

  return (
    <>
      <h3>Open Bets</h3>
      {!signer ? (
        <p style={{ color: "red", fontWeight: "bold" }}> Please connect wallet</p>
      ) : (
        <>
          <p>Enter duration:</p>
          <input type="text" id="address" name="address" onChange={handleChange} value={duration} />
          <button onClick={() => { setOpenBets(); } }>
            {isLoading ? `Wait till the transaction to be completed` : `Open`}
          </button>
        </>
      )}
      {isLoading}
      {txData === undefined ? null : (
        <>
          <div>
            <p>Transaction completed!</p>
            <a href={"https://goerli.etherscan.io/tx/" + txData.transactionHash} target="_blank"> 
              {txData.transactionHash}
            </a>
          </div>
        </>
      )}
    </>
  );  
}









const Home = () => {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [destination, setDestination] = useState("New York");
  const [guests, setGuests] = useState(2);

  return (
    <>
      <div className="tabContent">
        <div className="searchFields">
          <div className="inputs"> Location
            <Select defaultOptionIndex={0} onChange={(data) => setDestination(data.lable)}
              options={[
                {
                  id: "ny",
                  label: "New York",
                },
                {
                  id: "lon",
                  label: "London",
                },
                {
                  id: "db",
                  label: "Dubai",
                },
                {
                  id: "la",
                  label: "Los Angeles",
                },
              ]}
              name={""}
            />
          </div>
          <h1>Check In</h1>
          <div className="inputs"> 
            <DatePicker id="CheckIn" onChange={(event) => setCheckIn(event.date)} />
          </div>
          <h1>Check Out</h1>
          <div className="inputs">  
            <DatePicker id="CheckOut" onChange={(event) => setCheckOut(event.date)} />
          </div>
          <h1>Guests</h1>
          <div className="inputs">  
            <Input value={1} name="AddGuests" type="number" onChange={(event) => setGuests(Number(event.target.value))} />
          </div>
          <div className="searchButton">
            <Button text="Search" onClick={() => console.log(checkOut)} />
          </div>
        </div>
      </div>
    </>
  );
};