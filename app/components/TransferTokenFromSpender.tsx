import { useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";
import { config } from "@/config/wagmi";

export default function TransferFromButton() {
  const { writeContract, isPending, error } = useWriteContract();

  async function handleTransferFrom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const from = formData.get("from") as string;       // The owner who approved the tokens
    const to = formData.get("to") as string;           // The recipient
    const amount = formData.get('amount')
    console.log(amount)

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "transferFrom",
      args: [from, to, BigInt(amount  * (10 ** 18))],
    });

    console.log(BigInt(amount  * (10 ** 18)))
  }

  return (
    <form onSubmit={handleTransferFrom} className="flex flex-col bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-xl shadow-lg p-6 space-y-6">
    <h2 className="text-xl font-semibold text-purple-400 text-center">Transfer Tokens Through Spender</h2>

    <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
            <label htmlFor="from" className="mb-2 text-sm font-medium text-purple-300">From Address</label>
            <input
                name="from"
                placeholder="0xA0Cf…251e"
                required
                className="px-4 py-2 border border-gray-600 bg-gray-700 text-purple-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </div>

        <div className="flex flex-col">
            <label htmlFor="to" className="mb-2 text-sm font-medium text-purple-300">To Address</label>
            <input
                name="to"
                placeholder="0xB1Dd…314f"
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
            disabled={isPending}
            className={`w-full py-3 rounded-lg font-semibold transition duration-200 ease-in-out transform ${isPending ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 hover:scale-105'} text-white`}
        >
            {isPending ? "Transferring..." : "Transfer From"}
        </button>

        {error && (
            <div className="text-red-500 mt-2 text-center">
                Error: {error.message}
            </div>
        )}
    </div>
</form>

  );
}