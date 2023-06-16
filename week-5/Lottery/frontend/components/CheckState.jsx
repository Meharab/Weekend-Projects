import { useState } from "react";

export default function CheckState({ lotteryContract }) {
  const [currentBlockDate, setCurrentBlockDate] = useState(new Date());
  const [closingTimeDate, setClosingTimeDate] = useState(new Date());
  const [check, setCheck] = useState();
  const [isLoading, setLoading] = useState(false);

  async function getCheckState() {
    setLoading(true);
    try {
      const state = await lotteryContract.betsOpen();
      console.log(state);
      const provider = lotteryContract.provider;
      const currentBlock = await provider.getBlock("latest");
      const currentBlockDate = new Date(currentBlock.timestamp * 1000);
      console.log(currentBlockDate);
      setCurrentBlockDate(currentBlockDate);
      const closingTime = await lotteryContract.betsClosingTime();
      const closingTimeDate = new Date(closingTime.toNumber() * 1000);
      console.log(closingTimeDate);
      setClosingTimeDate(closingTimeDate);
      setCheck(state);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <h3>Query State</h3>
      <button
        onClick={() => {
          getCheckState();
        }}
      >
        {isLoading ? `Checking status...` : `Check`}
      </button>
      {check === undefined ? null : (
        <>
          {check ? (
            <>
              <h1>The lottery is open!!!</h1>
              <h1>
                The last block was mined at{" "}
                {currentBlockDate.toLocaleDateString()} :{" "}
                {currentBlockDate.toLocaleTimeString()}
              </h1>
              <h1>
                Lottery should close at {closingTimeDate.toLocaleDateString()} :{" "}
                {closingTimeDate.toLocaleTimeString()}
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
