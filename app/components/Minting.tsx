import { useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";
import { waitForTransactionReceipt } from "viem/actions";
import { config } from "@/config/wagmi";
import { useState } from "react";

export function Mint() {
    const { writeContractAsync } = useWriteContract();
    const [address, setAddress] = useState('');
    const [value, setValue] = useState('');
    const [completed, setCompleted] = useState(false);
    const [started, setStarted] = useState(false);
    const [errors, setErrors] = useState('');

    const handleMinting = async () => {
        setStarted(true);
        setErrors('');

        if (!address || !value || isNaN(Number(value)) || Number(value) <= 0) {
            setErrors('Please enter a valid address and amount.');
            setStarted(false);
            return;
        }

        try {
            const data = await writeContractAsync({
                abi: CONTRACT_ABI,
                address: CONTRACT_ADDRESS,
                functionName: "mint",
                args: [address, BigInt(Number(value) * (10 ** 18))]
            });
            
            const receipt = await waitForTransactionReceipt(config, {
                hash: data,
                confirmations: 1
            });
            
            if (receipt.status === 1) {
                setCompleted(true);
                setAddress('');
                setValue('');
            } else {
                setErrors('Transaction failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            setErrors('Payment Failed. Please try again.');
        } finally {
            setStarted(false);
        }
    };

    return (
        <div className="flex  flex-col bg-gradient-to-r h-min from-gray-800 via-gray-900 to-black text-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-purple-400 text-center">Mint NBL Tokens</h2>
            
            {!completed ? (
                <form onSubmit={(e) => { e.preventDefault(); handleMinting(); }} className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="address" className="mb-2 text-sm font-medium text-purple-300">Recipient Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="0xA0Cf…251e"
                            required
                            className="px-4 py-2 border border-gray-600 bg-gray-700 text-purple-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="value" className="mb-2 text-sm font-medium text-purple-300">Amount (NBL)</label>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="0.05"
                            required
                            min="0"
                            step="any"
                            className="px-4 py-2 border border-gray-600 bg-gray-700 text-purple-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={started}
                        className={`w-full py-3 rounded-lg font-semibold transition duration-200 ease-in-out transform ${started ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 hover:scale-105'} text-white`}
                    >
                        {started ? "Confirming..." : "Mint Now"}
                    </button>
                </form>
            ) : (
                <p className="text-stone-800 mt-2 bg-green-200 rounded-md text-sm py-2 px-4 text-center">Thank you for minting PTK!!!</p>
            )}

            {errors && (
                <p className="text-red-500 mt-2 text-center">
                    {errors}
                </p>
            )}
        </div>
    );
}
