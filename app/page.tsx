"use client"

import { useConnect , useAccount , useWriteContract } from "wagmi";
import { injected } from "wagmi/connectors";
import {sepolia} from "viem/chains"
import NebulaTokenAbi from '../abi/NebulaTokenAbi.json'
import { Account } from "./components/Account";
import { WalletOptions } from "./components/WalletOptions";
import ConnectWallet from "./components/ConnectWallet";


export default function Home() {

  return (
    <>
      <div className="flex justify-center items-center h-screen">
      <ConnectWallet/>
      </div>
    </>
  );
}
