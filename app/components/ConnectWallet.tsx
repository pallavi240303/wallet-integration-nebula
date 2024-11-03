import { useConnect, useAccount } from "wagmi";
import { Account } from "./Account";
import { WalletOptions } from "./WalletOptions";


function ConnectWallet() {
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col items-center  space-y-4">
      {isConnected ? (
        <><Account /></>
      ) : (
        <WalletOptions />
      )}
    </div>
  );
}

export default ConnectWallet;
