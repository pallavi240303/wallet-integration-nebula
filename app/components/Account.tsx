"use client";
import { useAccount, useDisconnect } from "wagmi";
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

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: balance } = useFetchBalance(address as `0x${string}`);
  const { data: symbol } = useFetch("symbol");

  const formattedBalance = balance
    ? parseFloat(formatEther(balance as bigint)).toFixed(2)
    : "0.00";

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
    <div className="flex flex-col w-full  gap-4 items-center ">
      <div className="flex gap-4 justify-between">
        <div className=" flex flex-col items-center h-fit w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-xl shadow-lg  justify-between p-6 space-y-4">
          <div className="flex flex-col items-center space-y-2 ">
            {address && (
              <div
                onClick={handleCopy}
                className="font-semibold text-lg text-purple-400 truncate cursor-pointer"
              >
                {address}
              </div>
            )}

            <div className="text-xl font-semibold ">
              Balance: {formattedBalance}{" "}
              <span className="text-sm font-medium text-purple-300">{`${symbol}`}</span>
            </div>
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
      <div className="p-2 md:p-4 columns-2 md:columns-3 lg:columns-3 gap-4">
        <Burn />
        <div className="break-inside-avoid mt-4">
          <Allowance />
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
  );
}
