import { Hex } from "viem";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";

export default function TransferButton() {
    const { data: hash, isPending, error, writeContract } = useWriteContract()
    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const toAddress = formData.get('address') as Hex
        const amount = formData.get('value') 

        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'transfer',
            args: [toAddress, BigInt(amount  * (10 ** 18))]
        })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash
    })

    return (
        <form onSubmit={submit} className="flex flex-col bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-purple-400 text-center">Transfer NBT Tokens</h2>
            
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="address" className="mb-2 text-sm font-medium text-purple-300">Recipient Address</label>
                    <input
                        name="address"
                        placeholder="0xA0Cf…251e"
                        required
                        className="px-4 py-2 border border-gray-600 bg-gray-700 text-purple-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="value" className="mb-2 text-sm font-medium text-purple-300">Amount (NBT)</label>
                    <input
                        name="value"
                        placeholder="0.05"
                        type="number"
                        required
                        className="px-4 py-2 border border-gray-600 bg-gray-700 text-purple-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={isPending}
                    className={`w-full py-3 rounded-lg font-semibold transition duration-200 ease-in-out transform ${isPending ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 hover:scale-105'} text-white`}
                >
                    {isPending ? 'Confirming...' : 'Transfer NBT'}
                </button>
                
                {hash && (
                    <div className="text-sm text-purple-300 mt-2 text-center">
                        Transaction Hash: <span className="font-mono">{hash}</span>
                    </div>
                )}
                
                {isConfirming && (
                    <div className="text-yellow-400 mt-2 text-center">Waiting for confirmation...</div>
                )}
                
                {isConfirmed && (
                    <div className="text-green-400 mt-2 text-center">Transaction confirmed!</div>
                )}
                
                {error && (
                    <div className="text-red-500 mt-2 text-center">
                        Error: {(error as BaseError).shortMessage || error.message}
                    </div>
                )}
            </div>
        </form>
    )
}