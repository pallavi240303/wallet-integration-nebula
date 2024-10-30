"use client";
import * as React from "react";
import { Connector, useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
  ));
}

function WalletOption({
  connector,
  onClick,
  }: {
    connector: Connector;
    onClick: () => void;
  }) {
    const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      disabled={!ready}
      onClick={onClick}
      className={`w-56 ${
        ready
          ? "bg-purple-900 hover:bg-purple-600 "
          : "bg-gray-500 cursor-not-allowed"
      } mx-4 px-6 py-3 rounded-full text-white font-semibold transition duration-200 ease-in-out transform ${
        ready ? "hover:scale-105" : ""
      } flex items-center justify-center space-x-2`}
    >
      {!ready ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l1.668 1.68A7.962 7.962 0 014 12H0c0 2.489 1.02 4.747 2.66 6.34l1.34-1.049z"
          ></path>
        </svg>
      ) : (
        <span>{connector.name}</span>
      )}
    </button>
  );
}
