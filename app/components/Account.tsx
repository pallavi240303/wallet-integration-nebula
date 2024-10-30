"use client"
import { useAccount, useDisconnect} from 'wagmi'
import { formatEther } from 'viem'
import { useFetchBalance, useFetch } from '@/utils/ContractUtils'


export function Account() {
  const { address  } = useAccount()
  const { disconnect } = useDisconnect()

  const { data: balance } = useFetchBalance(address as `0x${string}`); 
  const { data: totalSupply } = useFetch("totalSupply");
  const { data: marketCap } = useFetch("cap");
  const { data: symbol} = useFetch("symbol");

  const formattedBalance = balance ? parseFloat(formatEther(balance as bigint)).toFixed(2) : '0.00';
  const formattedTotalSupply = totalSupply ? parseFloat(formatEther(totalSupply as bigint)).toFixed(2) : 'Loading...';
  const formattedMarketCap = marketCap ? parseFloat(formatEther(marketCap as bigint)).toFixed(2) : 'Loading...'; 

  return (
    <div className="flex flex-col bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-xl shadow-lg h-64 justify-between p-6 space-y-4">
  <div className="flex flex-col items-center space-y-2 ">
    {address && (
      <div className="font-semibold text-lg text-purple-400 truncate">
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

  )
}