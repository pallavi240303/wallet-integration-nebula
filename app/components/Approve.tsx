import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";
import { useState } from "react";

export default function ApproveButton() {
    const { writeContract, isPending, data: transactionHash, error } = useWriteContract();
    const [transactionError, setTransactionError] = useState("");

    // Wait for the transaction receipt
    const { isLoading: isConfirming, isSuccess: isApproved } = useWaitForTransactionReceipt({
        hash: transactionHash,
    });

    async function handleApprove(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setTransactionError("");

        const formData = new FormData(e.target as HTMLFormElement);
        const spender = formData.get("spender") as string;
        const amount = BigInt(formData.get("amount") as string) * BigInt(10 ** 18);

        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: "approve",
                args: [spender, amount],
            });
        } catch (err) {
            console.error(err);
            setTransactionError("Approval failed. Please try again.");
        }
    }

    return (
        <form onSubmit={handleApprove} className="flex flex-col bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-purple-400 text-center">Approve Token Transfer</h2>
            
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="spender" className="mb-2 text-sm font-medium text-purple-300">Spender Address</label>
                    <input
                        name="spender"
                        placeholder="0xA0Cf…251e"
                        required
                        className="px-4 py-2 border border-gray-600 bg-gray-700 text-purple-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="amount" className="mb-2 text-sm font-medium text-purple-300">Amount</label>
                    <input
                        name="amount"
                        type="number"
                        placeholder="Enter amount"
                        required
                        className="px-4 py-2 border border-gray-600 bg-gray-700 text-purple-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending || isConfirming}
                    className={`w-full py-3 rounded-lg font-semibold transition duration-200 ease-in-out transform ${isPending || isConfirming ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 hover:scale-105'} text-white`}
                >
                    {isPending || isConfirming ? "Processing..." : "Approve"}
                </button>

                {isApproved && (
                    <div className="text-green-400 mt-2 text-center">Approval successful!</div>
                )}

                {transactionError && (
                    <div className="text-red-500 mt-2 text-center">
                        {transactionError}
                    </div>
                )}
                
                {error && (
                    <div className="text-red-500 mt-2 text-center">
                        Error: {error.message}
                    </div>
                )}
            </div>
        </form>
    );
}
