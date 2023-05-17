# TokenizedBallot Project

Ballot contract with ERC20 Votes extension

Deploy Votes Contract:

```shell
yarn ts-node --files ./scripts/deployVotesContract.ts
```

Mint vote tokens:

```shell
yarn ts-node --files ./scripts/mintTokens.ts <votes_contract_address> <voter_address> <mint_amount>
```

Delegate a vote:

```shell
yarn ts-node --files ./scripts/delegate.ts <votes_contract_address> <voter_address>
```

Deploy Ballot Contract:

```shell
yarn ts-node --files ./scripts/deployBallotContract.ts <votes_contract_address> Proposal1 Proposal2 Proposal3 ....
```

Check voting power:

```shell
yarn ts-node --files ./scripts/checkVotingPower.ts <ballot_contract_address> <voter_address>
```

Vote:

```shell
yarn ts-node --files ./scripts/vote.ts <ballot_contract_address> <proposal_num> <votes_amount>
```

Get winner proposal name:

```shell
yarn ts-node --files ./scripts/getWinnerName.ts <ballot_contract_address>
```
