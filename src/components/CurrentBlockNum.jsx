import { useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function CurrentBlockNum({ currentBlockNumber, setCurrentBlockNumber }) {
  useEffect(() => {
    async function getBlockNumber() {
      setCurrentBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  return (
    <div className="relative bg-white pt-3 pb-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:mt-8 sm:max-w-xs sm:rounded-sm">
      Current Block Number: {currentBlockNumber}
    </div>
  );
}

export default CurrentBlockNum;
