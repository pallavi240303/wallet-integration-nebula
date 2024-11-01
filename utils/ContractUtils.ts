// contractUtils.ts
import { CONTRACT_ABI, CONTRACT_ADDRESS} from '@/app/constants';
import { useReadContract, useWriteContract } from 'wagmi';

export const useFetchBalance = (address: `0x${string}`) => {
  return useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'balanceOf',
    args: [address],
  });
};

export const useFetch = (functionName: string) => {
  return useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName,
  });
};

export const useFetchAllowance = (owner , spender) => {
  console.log(owner);
  console.log(spender);
  return useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "allowance",
    args: [owner , spender]
  })

}