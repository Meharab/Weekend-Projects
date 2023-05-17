# Week 2 project

## Introduction:
The given smart contract is a decentralized voting system with delegation functionality. It allows users to create a new ballot, give rights to vote, delegate votes to other users, and cast their votes on a proposal.

## Functions:

Constructor: Initializes the contract, sets the chairperson as the sender, and creates an array of proposals based on the given proposal names.

giveRightToVote: This function allows the chairperson to give the right to vote to an address.
<img width="1287" alt="CleanShot 2023-05-08 at 14 49 43" src="https://user-images.githubusercontent.com/24606613/236786956-3f7a03ef-e8df-485c-a3e8-fa9e2b3e8541.png">

delegate: Allows a voter to delegate their voting power to another voter.
<img width="1287" alt="CleanShot 2023-05-08 at 14 50 14@2x" src="https://user-images.githubusercontent.com/24606613/236787073-1fd649d2-e4f5-413c-a50c-e9c108094fbc.png">

vote: Allows a voter to cast their vote for a specific proposal.
![CleanShot 2023-05-08 at 14 51 49@2x](https://user-images.githubusercontent.com/24606613/236787440-0d62e666-6f99-4a4f-af03-ecf268022066.png)

winningProposal: Computes the winning proposal based on the accumulated votes.

winnerName: Returns the name of the winning proposal.
<img width="1287" alt="CleanShot 2023-05-08 at 14 52 27@2x" src="https://user-images.githubusercontent.com/24606613/236787536-3df795c5-81ef-46dc-b0ff-5cf84b8ef063.png">

listProposal: Returns a list of all proposals.
<img width="1287" alt="CleanShot 2023-05-08 at 14 53 07@2x" src="https://user-images.githubusercontent.com/24606613/236787652-804da047-8b25-457b-97b1-22ec1b614835.png">



## Transactions:

Contract creation: https://sepolia.etherscan.io/tx/0xbf7628ff37b2680038adc2f850cc869c429ae8303bd62e079cb46f7d9453a874

Giving the right to vote to 0xD6230D359064d1A7D77D0Cd3a54781fE5A4dB8D8: https://sepolia.etherscan.io/tx/0x8c4dc56a14042321ba378bf6667da0af033efb8cc46ff9ae8db12fe3e7849bb0

Vote by 0xD6230D359064d1A7D77D0Cd3a54781fE5A4dB8D8: https://sepolia.etherscan.io/tx/0x1dd3720b5f3a2c96a36424a1be5e32fbf57edb2ed6309de40f162c136840949c

Delegation of vote by 0xDA3AF9c51F6953988a46C21d43A5152AFC7f389d to 0xF98981628E50d9b80c7A769116609787f94770CA: https://sepolia.etherscan.io/tx/0xcf694666c7e8f759e58248e5aa27c7930a5f78a92b9cb1d2af591bee7e711959

To check all other contract events - [0x9FfE30a62B776A31ADE2C2aEb59412d3E0126428](https://sepolia.etherscan.io/address/0x9FfE30a62B776A31ADE2C2aEb59412d3E0126428)
