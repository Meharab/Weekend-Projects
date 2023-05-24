// import styles from "../styles/InstructionsComponent.module.css";
// import Router, { useRouter } from "next/router";
// export default function InstructionsComponent() {
// 	const router = useRouter();
// 	return (
// 		<div className={styles.container}>
// 			<header className={styles.header_container}>
// 				<h1>
// 					create<span>-web3-dapp</span>
// 				</h1>
// 				<p>
// 					Get started by editing this page in{" "}
// 					<span>/pages/index.js</span>
// 				</p>
// 			</header>

// 			<div className={styles.buttons_container}>
// 				<a
// 					target={"_blank"}
// 					href={"https://createweb3dapp.alchemy.com/#components"}
// 				>
// 					<div className={styles.button}>
// 						{/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
// 						<p>Add Components</p>
// 					</div>
// 				</a>
// 				<a
// 					target={"_blank"}
// 					href={"https://createweb3dapp.alchemy.com/#templates"}
// 				>
// 					<div className={styles.button}>
// 						{/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
// 						<p>Explore Templates</p>
// 					</div>
// 				</a>
// 				<a
// 					target={"_blank"}
// 					href={"https://docs.alchemy.com/docs/create-web3-dapp"}
// 				>
// 					<div className={styles.button}>
// 						<img
// 							src="https://static.alchemyapi.io/images/cw3d/Icon%20Large/file-eye-01-l.svg"
// 							width={"20px"}
// 							height={"20px"}
// 						/>
// 						<p>Visit Docs</p>
// 					</div>
// 				</a>
// 			</div>
// 			<div className={styles.footer}>
// 				<a href="https://alchemy.com/?a=create-web3-dapp" target={"_blank"}>
// 					<img
// 						id="badge-button"
// 						style={{ width: "240px", height: "53px" }}
// 						src="https://static.alchemyapi.io/images/marketing/badgeLight.png"
// 						alt="Alchemy Supercharged"
// 					/>
// 				</a>
// 				<div className={styles.icons_container}>
// 					<div>
// 						<a
// 							href="https://github.com/alchemyplatform/create-web3-dapp"
// 							target={"_blank"}
// 						>
// 							Leave a star on Github
// 						</a>
// 					</div>
// 					<div>
// 						<a
// 							href="https://twitter.com/AlchemyPlatform"
// 							target={"_blank"}
// 						>
// 							Follow us on Twitter
// 						</a>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }



// import styles from "../styles/InstructionsComponent.module.css";
// import Router, { useRouter } from "next/router";
// import { useSigner, useNetwork, useBalance  } from 'wagmi';
// import { useState, useEffect } from 'react';
// export default function InstructionsComponent() {
// 	const router = useRouter();
// 	return (
// 		<div className={styles.container}>
// 			<header className={styles.header_container}>
// 				<h1>
// 					My dApp
// 				</h1>
// 			</header>

// 			<div className={styles.buttons_container}>
// 				<PageBody></PageBody>
// 			</div>
// 			<div className={styles.footer}>
// 				Footer
// 			</div>
// 		</div>
// 	);
// }

// function PageBody() {
// 	return (
// 		<>
// 			<WalletInfo></WalletInfo>
// 			<Profile></Profile>
// 			<RequestTokens></RequestTokens>
// 		</>
// 	);
// }

// function WalletBalance() {
// 	const { data: signer } = useSigner();
// 	const { data, isError, isLoading } = useBalance({
// 		address: signer._address,
// 	  })

// 	  if (isLoading) return <div>Fetching balance…</div>
// 	  if (isError) return <div>Error fetching balance</div>
// 	  return (
// 			<div>
// 			  Balance: {data?.formatted} {data?.symbol}
// 			</div>
// 	  )
// }

// function WalletInfo() {
// 	const { data: signer, isError, isLoading } = useSigner();
// 	const { chain, chains } = useNetwork();
// 	console.log(signer);
// 	if (signer) return (
// 		<>
// 			<p>Your account address is {signer._address}</p>
// 			<p>Connected to the {chain.name} network</p>
// 			<button onClick={() => signMessage(signer, "I Love WEB3")}>Sign</button>
// 			<WalletBalance></WalletBalance>
// 		</>
// 	)
// 	else if (isLoading) return (
// 		<>
// 			<p>Loading...</p>
// 		</>
// 	)
// 	else return (
// 		<>
// 			<p>Connect account to continue</p>
// 		</>
// 	)
// }

// function signMessage(signer, message) {
// 	signer.signMessage(message).then(
// 		(signature) => {console.log(signature)},
// 		(error) => {console.error(error)}
// 	)
// }

// function Profile() {
// 	const [data, setData] = useState(null);
// 	const [isLoading, setLoading] = useState(false);

// 	useEffect(() => {
// 		setLoading(true);
// 		fetch('https://random-data-api.com/api/v2/users')
// 		.then((res) => res.json())
// 		.then((data) => {
// 			setData(data);
// 			setLoading(false);
// 		});
// 	}, []);

// 	if (isLoading) return <p>Loading...</p>;
// 	if (!data) return <p>No profile data</p>;

// 	return (
// 		<div>
// 		<h1>{data.username}</h1>
// 		<p>{data.email}</p>
// 		</div>
// 	);
// }

// function RequestTokens() {
// 	const { data: signer } = useSigner();
// 	const [txData, setTxData] = useState(null);
// 	const [isLoading, setLoading] = useState(false);
// 	if (txData) return (
// 		<div>
// 			<p>Transaction completed!</p>
// 			<a href={"https://goerli.etherscan.io/tx/" + txData.hash} target="_blank">{txData.hash}</a>
// 		</div>
// 	)
// 	if (isLoading) return <p>Requesting tokens to be minted...</p>;
// 	return (
// 		<div>
// 			<button onClick={() => requestTokens(signer, "signature", setLoading, setTxData)}>Request Token</button>
// 		</div>
// 	)
// }

// function requestTokens(signer, signature, setLoading, setTxData) {
// 	setLoading(true);
// 	const requestOptions = {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify({ address: signer._address, signature: signature })
// 	};
// 	fetch('http://localhost:3001/request-tokens', requestOptions)
// 		.then(response => response.json())
// 		.then((data) => {
// 			setTxData(data);
// 			setLoading(true);
// 	});
// }



import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useSigner, useNetwork, useBalance, useContractRead, useContractWrite, usePrepareContractWrite,
  useWaitForTransaction, } from "wagmi";
import { useState, useEffect } from "react";
import ballotJson from "../assets/TokenizedBallot.json";
import ERC20Json from "../assets/MyERC20Votes.json";
import { ethers } from "ethers";

let ballotAddress, setBallotAddress;
let ERC20Address, setERC20Address;
let proposalsList, setProposalsList;
let proposalNum, setProposalNum;
let voteAmount, setVoteAmount;
let winnerName, setWinnerName;
let delegateAddress, setDelegateAddress;
let votingPower, setVotingPower;

export default function InstructionsComponent() {
  const router = useRouter();
  [ballotAddress, setBallotAddress] = useState("0xE1cbf3b40c34AE9aDc0390E9c781cD3b4D5FC791"); // 0x76b3DcF1F09b7844e700a690Dd4Ceb43C9b69C65
  [ERC20Address, setERC20Address] = useState("0xCf90EBBDFD9F348Fc7A3219f4D9C383aE16b2217"); // 0xaaA84a2aF9dAA7ffF0aabEE183584e4C735Bda84
  [proposalsList, setProposalsList] = useState([]);
  [proposalNum, setProposalNum] = useState(0);
  [voteAmount, setVoteAmount] = useState(0);
  [winnerName, setWinnerName] = useState(null);
  [delegateAddress, setDelegateAddress] = useState();
  [votingPower, setVotingPower] = useState();
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <h1>Voting dApp</h1>
      </header>
      <div className={styles.buttons_container}>
        <PageBody></PageBody>
      </div>
      <div className={styles.footer}>Footer</div>
    </div>
  );
}

function PageBody() {
  return (
    <>
      <ContractAddress></ContractAddress>
      <Proposals></Proposals>
      <VoteAmount></VoteAmount>
      <Vote></Vote>
      <Mint></Mint>
      <RequestTokens></RequestTokens>
      <Result></Result>
      <Delegate></Delegate>
      <VotingPower></VotingPower>
    </>
  );
}

function ContractAddress() {
  return (
    <>
      <p>Ballot contract address: {ballotAddress}</p>
      <p>Token contract address: {ERC20Address}</p>
    </>
  );
}

function Proposals() {
  // const { data :useContractReadData } = useContractRead({
  // 	address: ballotAddress,
  // 	abi: ballotJson.abi,
  // 	functionName: 'listProposal'
  //   });

  //   useEffect(() => {
  // 	console.log(useContractReadData);
  //   }, [useContractReadData]);
  const { data: signer } = useSigner();
  const handleChange = (event) => {
    setProposalNum(event.target.value);
  };
//   useEffect(() => {
//     	getProposals(signer);
//       }, [signer]);
  return (
    <>
      <h1>Vote</h1>
      <button onClick={() => { getProposals(signer); }}> Get proposals </button>
      <label> Select a Proposal to Vote:
        <select value={proposalNum} onChange={handleChange}>
          {proposalsList.map((proposal, index) => (
            <option value={index}>{index}.{proposal}</option>
          ))}
        </select>
      </label>
    </>
  );
}

function getProposals(signer) {
  const ballotContract = new ethers.Contract(ballotAddress, ballotJson.abi, signer.provider);
  ballotContract.connect(signer).listProposal().then((response) => {
    const proposals = response.map((element) => ethers.utils.parseBytes32String(element));
    setProposalsList(proposals);
  });
}

function VoteAmount() {
  const handleChange = (event) => {
    setVoteAmount(event.target.value);
  };
  return (
    <>
      <p>Enter vote amount:</p>
      <input type="text" id="address" name="address" onChange={handleChange} value={voteAmount}/>
    </>
  );
}

function Mint() {
  const { data: signer } = useSigner();
  const [txData, setTxData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  if (txData)
    return (
      <div>
        <p>Transaction completed!</p>
        <a href={"https://goerli.etherscan.io/tx/" + txData.transactionHash} target="_blank"> {txData.transactionHash} </a>
      </div>
    );
  if (isLoading) return <p>Wait till the transaction to be completed</p>;
  return (
    <>
    <h3>Only Admin can Mint Tokens</h3>
      <button onClick={() => { castMint(signer, setLoading, setTxData); }}> Mint </button>
    </>
  );
}

async function castMint(signer, setLoading, setTxData) {
  setLoading(true);
  const ERC20Contract = new ethers.Contract(ERC20Address, ERC20Json.abi, signer.provider);
  const mint = await ERC20Contract.connect(signer).mint("0xC506dB1beb6555B1b887AD2aC518d9676Fa95e6b", 100);
  const data = await mint.wait();
  try {
    setTxData(data);
  } catch (error) {
    throw console.error(error);
  }
  setLoading(false);
}

function Vote() {
  const { data: signer } = useSigner();
  const [txData, setTxData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  if (txData)
    return (
      <div>
        <p>Transaction completed!</p>
        <a href={"https://goerli.etherscan.io/tx/" + txData.transactionHash} target="_blank"> {txData.transactionHash} </a>
      </div>
    );
  if (isLoading) return <p>Wait till the transaction to be completed</p>;
  return (
    <>
      <button onClick={() => { castVote(signer, setLoading, setTxData); }}> Vote </button>
    </>
  );
}

async function castVote(signer, setLoading, setTxData) {
  setLoading(true);
  const ballotContract = new ethers.Contract(ballotAddress, ballotJson.abi, signer.provider);
  const vote = await ballotContract.connect(signer).vote(proposalNum, voteAmount);
  const data = await vote.wait();
  try {
    setTxData(data);
  } catch (error) {
    throw console.error(error);
  }
  setLoading(false);
}

function Result() {
  const { data: signer } = useSigner();
  const [isLoading, setLoading] = useState(false);
  if (isLoading) return <p>loading...</p>;
  return (
    <>
      <h3>Query Results</h3>
      <button onClick={() => { getWinnerName(signer, setLoading); }}> Final Result </button>
      <h1>{winnerName}</h1>
    </>
  );
  
}

async function getWinnerName(signer, setLoading) {
  setLoading(true);
  const ballotContract = new ethers.Contract(ballotAddress, ballotJson.abi, signer.provider);
  const winner = ethers.utils.parseBytes32String(await ballotContract.connect(signer).winnerName());
  try {
    setWinnerName(winner);
  } catch (error) {
    throw console.error(error);
  }
  setLoading(false);
}

function Delegate() {
  const { data: signer } = useSigner();
  const [txData, setTxData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const handleChange = (event) => {
    setDelegateAddress(event.target.value);
  };
  if (txData)
    return (
      <div>
        <p>Transaction completed!</p>
        <a href={"https://goerli.etherscan.io/tx/" + txData.transactionHash} target="_blank"> {txData.transactionHash} </a>
      </div>
    );
  if (isLoading) return <p>Wait till the transaction to be completed</p>;
  return (
    <>
      <h3>Delegate Tokens</h3>
      <p>Input Address</p>
      <input type="text" id="address" name="address" onChange={handleChange}/>
      <button onClick={() => { delegateTo(signer, delegateAddress, setLoading, setTxData); }}> Delegate </button>
    </>
  );
}

async function delegateTo(signer, delegateAddress, setLoading, setTxData) {
  setLoading(true);
  const ERC20Contract = new ethers.Contract(ERC20Address, ERC20Json.abi, signer.provider);
  const delegate = await ERC20Contract.connect(signer).delegate(delegateAddress);
  const data = await delegate.wait();
  try {
    setTxData(data);
  } catch (error) {
    throw console.error(error);
  }
  setLoading(false);
}

function VotingPower() {
  const { data: signer } = useSigner();
  const [isLoading, setLoading] = useState(false);
  if (isLoading) return <p>loading...</p>;
  return (
    <>
      <h3>Check Your Voting Power</h3>
      <button onClick={() => { checkVotingPower(signer, setLoading); }}> Check </button>
      <h1>{votingPower}</h1>
    </>
  );
  
}

async function checkVotingPower(signer, setLoading) {
  setLoading(true);
  const ballotContract = new ethers.Contract(ballotAddress, ballotJson.abi, signer.provider);
  const power = ethers.utils.formatUnits((await ballotContract.votingPower(signer._address)).toString());
  try {
    setVotingPower(power);
  } catch (error) {
    throw console.error(error);
  }
  setLoading(false);
}

function RequestTokens() {
	const { data: signer } = useSigner();
	const [txData, setTxData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	if (txData) return (
		<div>
			<p>Transaction completed!</p>
			<a href={"https://goerli.etherscan.io/tx/" + txData.hash} target="_blank">{txData.hash}</a>
		</div>
	)
	if (isLoading) return <p>Requesting tokens to be minted...</p>;
	return (
		<div>
      <h3>Request for Tokens</h3>
			<button onClick={() => requestTokens(signer, "signature", setLoading, setTxData)}>Request Token</button>
		</div>
	)
}

function requestTokens(signer, signature, setLoading, setTxData) {
	setLoading(true);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ address: signer._address, signature: signature })
	};
	fetch('http://localhost:3001/request-tokens', requestOptions)
		.then(response => response.json())
		.then((data) => {
			setTxData(data);
			setLoading(true);
	});
}