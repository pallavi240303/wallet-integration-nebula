import { useReadContract } from "wagmi";
import { useState, useEffect } from "react";
import { formatEther } from "viem";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";

export default function Allowance() {
    const [owner, setOwner] = useState("");
    const [spender, setSpender] = useState("");
    const [formattedAllowance, setFormattedAllowance] = useState("0.00");
    const [shouldFetch, setShouldFetch] = useState(false);

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        setOwner(formData.get("owner") as string);
        setSpender(formData.get("spender") as string);
        setShouldFetch(true); 
    }

    const { data: allowance } = useReadContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "allowance",
        args: [owner, spender],
    });

    useEffect(() => {
        if (shouldFetch && allowance !== undefined) {
            const formatted = allowance ? parseFloat(formatEther(allowance as bigint)).toFixed(2) : '0.00';
            setFormattedAllowance(formatted);
            setShouldFetch(false);
        }
    }, [allowance, shouldFetch]);

    return (
        <form onSubmit={submit} className="w-full flex flex-col  bg-gradient-to-r h-min from-gray-800 via-gray-900 to-black text-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-purple-400 text-center">Check Allowance</h2>
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="owner" className="mb-2 text-sm font-medium text-purple-300">Owner Address</label>
                    <input
                        name="owner"
                        placeholder="0x..."
                        type="text"
                        required
                        className="px-4 py-2 border border-gray-600 bg-gray-700 text-purple-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="spender" className="mb-2 text-sm font-medium text-purple-300">Spender Address</label>
                    <input
                        name="spender"
                        placeholder="0x..."
                        type="text"
                        required
                        className="px-4 py-2 border border-gray-600 bg-gray-700 text-purple-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 rounded-lg font-semibold bg-purple-600 hover:bg-purple-500 hover:scale-105 transition duration-200 ease-in-out text-white"
                >
                    Check Allowance
                </button>
                <div>Allowance is: {formattedAllowance}</div>
            </div>
        </form>
    );
}
