
"use client";
import { useBalance } from "wagmi";
import { formatEther } from "viem";
import { useFetch, useFetchBalance } from "@/utils/ContractUtils";

interface ViewBalanceProps {
  address: `0x${string}` | undefined;
}

const ViewBalance: React.FC<ViewBalanceProps> = ({ address }) => {
  const { data: balance } = useFetchBalance(address as `0x${string}`);
  const { data: ethBalance } = useBalance({ address });

  const formattedEthBalance = ethBalance?.value
    ? parseFloat(formatEther(ethBalance.value as bigint)).toFixed(4)
    : "0.00";

  const formattedBalance = balance
    ? parseFloat(formatEther(balance as bigint)).toFixed(2)
    : "0.00";

  return (
    <div className="text-center">
      <div className="text-xl font-semibold">
        Balance: {`${formattedEthBalance}`}{" "}
        <span className="text-sm font-medium text-purple-300">ETH</span>
      </div>
      <div className="text-xl font-semibold">
        NBL Token Balance: {formattedBalance}{" "}
        <span className="text-sm font-medium text-purple-300">NBL</span>
      </div>
    </div>
  );
};

export default ViewBalance;
