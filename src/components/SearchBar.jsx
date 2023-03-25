import { useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);
function SearchBar({
  blockNumber,
  setBlockNumber,
  transactionHash,
  setTransactionHash,
}) {
  const [hash, setHash] = useState("");
  const [parentHash, setParentHash] = useState("");
  const [timeStamp, setTimeStamp] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [gasLimit, setGasLimit] = useState(0);
  const [txn, setTxn] = useState(0);
  const [gasUsedBlock, setGasUsedBlock] = useState("");
  const [miner, setMiner] = useState("");

  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [txnIdx, setTxnIdx] = useState(0);
  const [root, setRoot] = useState("");
  const [gasUsedTxn, setGasUsedTxn] = useState(0);
  const [txnHash, setTxnHash] = useState("");
  const [txnBlockNum, setTxnBlockNum] = useState(0);
  const [txnType, setTxnType] = useState(0);
  const [status, setStatus] = useState(0);
  const [cummulativeGasUsed, setCummulativeGasUsed] = useState(0);
  const [effectiveGasPrice, setEffectiveGasPrice] = useState(0);

  async function getBlock(evt) {
    const num = Number(evt.target.value);
    setBlockNumber(num);
    const {
      hash,
      parentHash,
      timestamp,
      nonce,
      difficulty,
      gasLimit,
      gasUsed,
      miner,
      transactions,
    } = await alchemy.core.getBlock(num);
    setHash(hash);
    setParentHash(parentHash);
    setTimeStamp(timestamp);
    setNonce(nonce);
    setDifficulty(difficulty);
    setGasLimit(parseInt(gasLimit));
    setGasUsedBlock(parseInt(gasUsed));
    setMiner(miner);
    setTxn(transactions);
  }
  async function getTxn(evt) {
    const hsh = evt.target.value;
    setTxnHash(hsh);
    const {
      to,
      from,
      contractAddress,
      transactionIndex,
      root,
      gasUsed,
      transactionHash,
      blockNumber,
      type,
      status,
      cummulativeGasUsed,
      effectiveGasPrice,
    } = await alchemy.core.getTransactionReceipt(hsh);
    setTo(to);
    setFrom(from);
    setContractAddress(contractAddress);
    setTxnIdx(transactionIndex);
    setRoot(root);
    setGasUsedTxn(parseInt(gasUsed));
    setTxnHash(transactionHash);
    setTxnBlockNum(blockNumber);
    setTxnType(type);
    setStatus(status);
    setCummulativeGasUsed(parseInt(cummulativeGasUsed));
    setEffectiveGasPrice(parseInt(effectiveGasPrice));
  }

  return (
    <div className="grid grid-cols-2 grid-rows-1 w-3/5 mx-auto">
      <div className="flex-col bg-white pt-3 pb-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:mt-8 w-11/12 h-11/12 sm:rounded-sm">
        <input
          className="border-gray block border-2 sm:rounded-lg border-solid sm:mx-auto p-3 w-3/4"
          type="text"
          placeholder="Enter a BlockNumber..."
          value={blockNumber}
          onChange={getBlock}
        />
        <br />
        <div className="mr-auto px-7">
          Block Details
          <br />
          <ul className="text-left">
            <li>
              Hash: {hash.slice(0, 10)} . . .{" "}
              {hash.slice(hash.length - 6, hash.length)}
            </li>
            <li>
              ParentHash: {parentHash.slice(0, 10)} . . .{" "}
              {parentHash.slice(parentHash.length - 6, parentHash.length)}
            </li>
            <li>TimeStamp: {timeStamp}</li>
            <li>Nonce: {nonce}</li>
            <li>Difficulty: {difficulty}</li>
            <li>GasLimit: {gasLimit}</li>
            <li>GasUsed: {gasUsedBlock}</li>
            <li>
              Miner: {miner.slice(0, 10)} . . .{" "}
              {miner.slice(miner.length - 6, miner.length)}
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-col bg-white pt-3 pb-3 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:mt-8 w-11/12 h-11/12 sm:rounded-sm">
        <input
          className="border-gray block border-2 sm:rounded-lg border-solid sm:mx-auto p-3 w-3/4"
          type="text"
          placeholder="Enter a TransactionHash..."
          value={transactionHash}
          onChange={getTxn}
        />
        <br />
        <div className="mr-auto px-7">
          Transaction Details
          <br />
          <ul className="text-left">
            <li>
              To: {to.slice(0, 10)} . . . {to.slice(to.length - 6, to.length)}
            </li>
            <li>
              From: {from.slice(0, 10)} . . .{" "}
              {from.slice(from.length - 6, from.length)}
            </li>
            <li>Transaction Index: {txnIdx}</li>
            <li>Root: {root}</li>
            <li>Gas Used: {gasUsedTxn}</li>
            <li>
              Transaction Hash: {txnHash.slice(0, 10)} . . .{" "}
              {txnHash.slice(txnHash.length - 6, txnHash.length)}
            </li>
            <li>BlockNumber: {txnBlockNum}</li>
            <li>Type: {txnType}</li>
            <li>Status: {status}</li>
            <li>CummulativeGasUsed: {cummulativeGasUsed}</li>
            <li>EffectiveGasPrice: {effectiveGasPrice}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
