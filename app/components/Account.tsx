"use client"
import { useAccount, useDisconnect } from 'wagmi'
import { formatEther, Hex } from 'viem'
import { useFetchBalance, useFetch, useFetchAllowance } from '@/utils/ContractUtils'
import TransferButton from './TransferToken'
import Approve from './Approve'
import { useState } from 'react'
import { Mint } from './Minting'
import TransferFromButton from './TransferTokenFromSpender'
import Burn from './Burn'





export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  const { data: balance } = useFetchBalance(address as `0x${string}`);
  const { data: totalSupply } = useFetch("totalSupply");
  const { data: marketCap } = useFetch("cap");
  const { data: symbol } = useFetch("symbol");

  const [owner, setOwner] = useState(`0x4cD3FB4a504cc978f316a81Dc5165D2C5b30592d`);
  const [spender, setSpender] = useState("0x23DF636d0D84BcF849618C35a3fF437Ef2e54f54");
  const { data: allowance } = useFetchAllowance(owner, spender);
  
  console.log(allowance)

  const formattedBalance = balance ? parseFloat(formatEther(balance as bigint)).toFixed(2) : '0.00';
  const formattedAllowance = allowance ? parseFloat(formatEther(allowance as bigint)).toFixed(2) : '0.00';
  const formattedTotalSupply = totalSupply ? parseFloat(formatEther(totalSupply as bigint)).toFixed(2) : 'Loading...';
  const formattedMarketCap = marketCap ? parseFloat(formatEther(marketCap as bigint)).toFixed(2) : 'Loading...';

  const handleCopy = () => {
    navigator.clipboard.writeText(address as Hex)
      .then(() => {
        alert("Address copied successfully!")
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      })
  }

  return (
    <div className='flex flex-col  gap-4 w-2/3'>
      <div className="flex flex-col bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-xl shadow-lg h-64 justify-between p-6 space-y-4">
        <div className="flex flex-col items-center space-y-2 ">
          {address && (
            <div onClick={handleCopy} className="font-semibold text-lg text-purple-400 truncate cursor-pointer">
              {address}
            </div>
          )}

          <div className="text-xl font-semibold ">
            Balance: {formattedBalance} <span className="text-sm font-medium text-purple-300">{`${symbol}`}</span>
          </div>
          <div className="text-xl font-semibold ">
            Total Supply: {formattedTotalSupply} <span className="text-sm font-medium text-purple-300">{`${symbol}`}</span>
          </div>
          <div className="text-xl font-semibold ">
            Market Cap: {formattedMarketCap} <span className="text-sm font-medium text-purple-300">{`${symbol}`}</span>
          </div>
        </div>

        <button
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg w-full transition-colors duration-200 ease-in-out transform hover:scale-105"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
        <div className="mt-2 text-lg bg-purple-950 rounded-full mb-2 px-3 py-2 text-white text-center">
            Allowance of spender: <span className="text-purple-300">{`${formattedAllowance}`}</span>
          </div>
      <div className='flex gap-1 flex-wrap'>
      <TransferButton/>
          <Mint />
        <Approve/>
        <TransferFromButton/>
        <Burn address ={address}/>
      </div>
    </div>
  )
}