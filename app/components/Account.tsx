"use client";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { formatEther, Hex } from "viem";
import { useFetchBalance, useFetch } from "@/utils/ContractUtils";
import TransferButton from "./TransferToken";
import Approve from "./Approve";
import { useState } from "react";
import { Mint } from "./Minting";
import TransferFromButton from "./TransferTokenFromSpender";
import Burn from "./Burn";
import SetBlockRewards from "./SetBlockReward";
import Allowance from "./Allowance";
import TokenDetails from "./TokenDetails";
import SignMessage from "./SignMessage";
import ViewBalance from "./ViewBalance";
import AddressBalance from "./AddressBalance";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [activeTab, setActiveTab] = useState("read");

  const { data: balance } = useFetchBalance(address as `0x${string}`);
  const { data: symbol } = useFetch("symbol");
  const { data: ethBalance } = useBalance({
    address,
  });

  const handleCopy = () => {
    navigator.clipboard
      .writeText(address as Hex)
      .then(() => {
        alert("Address copied successfully!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="flex flex-col box-border w-full items-center ">
      <div className="flex flex-col md:flex-row  justify-between">
        <div className="flex flex-col items-center h-fit scale-[0.95] bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex  flex-col items-center space-y-2">
            {address && (
              <div
                onClick={handleCopy}
                className="text-wrap font-semibold flex flex-wrap text-lg text-purple-400 truncate cursor-pointer"
              >
                Connected Wallet : {address}
              </div>
            )}
            {address && <ViewBalance address={address} />}
          </div>

          <button
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg w-full transition-colors duration-200 ease-in-out transform hover:scale-105"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </div>
        <TokenDetails />
      </div>
      <a
        href="#contractFuntions"
        className="inline-block px-6 mt-3 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-purple-500 active:bg-purple-700"
      >
        Perform Read/Write on Contract
      </a>

      <div className="md:p-4 flex flex-col w-4/5 mt-3" id="contractFuntions">
        <div className="flex space-x-4 mb-4 ">
          <button
            className={`flex-1 py-2 rounded-lg ${
              activeTab === "read"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300"
            } transition duration-200`}
            onClick={() => setActiveTab("read")}
          >
            Read Contract Actions
          </button>
          <button
            className={`flex-1 py-2 rounded-lg ${
              activeTab === "write"
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300"
            } transition duration-200`}
            onClick={() => setActiveTab("write")}
          >
            Write Contract Actions
          </button>
        </div>

        {activeTab === "read" && (
          <div className="rounded-lg p-4 shadow-lg">
            <div className="md:p-4 columns-1 md:columns-2 lg:columns-2 gap-4">
              <div className="break-inside-avoid mt-4">
                <Allowance />
              </div>
              <div className="break-inside-avoid mt-4">
                <AddressBalance />
              </div>
              <div className="break-inside-avoid mt-4">
                <SignMessage />
              </div>
            </div>
          </div>
        )}

        {activeTab === "write" && (
          <div className="rounded-lg p-4 shadow-lg">
            <div className="md:p-4 columns-1 md:columns-2 lg:columns-2 gap-4">
              <div className="break-inside-avoid mt-4">
                <Burn />
              </div>
              <div className="break-inside-avoid mt-4">
                <TransferButton />
              </div>
              <div className="break-inside-avoid mt-4">
                <Mint />
              </div>
              <div className="break-inside-avoid mt-4">
                <Approve />
              </div>
              <div className="break-inside-avoid mt-4">
                <SetBlockRewards />
              </div>
              <div className="break-inside-avoid mt-4">
                <TransferFromButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
