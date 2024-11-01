import { useFetch } from "@/utils/ContractUtils";

export default function TokenDetails() {
    const { data: name } = useFetch("name");
    const { data: owner } = useFetch("owner");
    const { data: cap } = useFetch("cap");
    const { data: totalSupply } = useFetch("totalSupply");
    const { data: symbol } = useFetch("symbol");
    const { data: decimals } = useFetch("decimals");

    return (
        <div className="flex flex-col items-center p-6 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl shadow-lg space-y-6 w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-purple-400">Token Details</h2>
            <div className="grid grid-cols-1 gap-6 w-full">
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4 shadow">
                    <span className="text-sm font-medium text-purple-300">Token Name</span>
                    <span className="text-lg font-semibold text-purple-100">{`${name}` || "Loading..."}</span>
                </div>
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4 shadow">
                    <span className="text-sm font-medium text-purple-300">Owner Address</span>
                    <span className="text-lg font-semibold text-purple-100 truncate">{`${owner}` || "Loading..."}</span>
                </div>
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4 shadow">
                    <span className="text-sm font-medium text-purple-300">Token Symbol</span>
                    <span className="text-lg font-semibold text-purple-100">{`${symbol}` || "Loading..."}</span>
                </div>
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4 shadow">
                    <span className="text-sm font-medium text-purple-300">Token Decimals</span>
                    <span className="text-lg font-semibold text-purple-100">{`${decimals}` || "Loading..."}</span>
                </div>
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4 shadow">
                    <span className="text-sm font-medium text-purple-300">Token Cap</span>
                    <span className="text-lg font-semibold text-purple-100">{`${cap}` || "Loading..."}</span>
                </div>
                <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4 shadow">
                    <span className="text-sm font-medium text-purple-300">Total Supply</span>
                    <span className="text-lg font-semibold text-purple-100">{`${totalSupply}` || "Loading..."}</span>
                </div>
            </div>
        </div>
    );
}
