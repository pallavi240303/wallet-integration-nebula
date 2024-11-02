import { useEffect, useState } from "react";
import { recoverMessageAddress } from "viem";
import { useSignMessage } from "wagmi";

export default function SignMessage() {
  const [recoveredAddress, setRecoveredAddress] = useState<string | null>(null);
  const {
    data: signMessageData,
    error,
    isPending,
    isSuccess,
    signMessage,
    variables,
  } = useSignMessage();

  useEffect(() => {
    (async () => {
      if (variables?.message && signMessageData) {
        const address = await recoverMessageAddress({
          message: variables?.message,
          signature: signMessageData,
        });
        setRecoveredAddress(address);
      }
    })();
  }, [signMessageData, variables?.message]);

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const message = formData.get("message") as string;
        signMessage({ message });
      }}
      className="flex flex-col bg-gradient-to-r w-96 from-gray-800 via-gray-900 to-black text-white rounded-xl shadow-lg p-6 space-y-6"
    >
      <h2 className="text-xl font-semibold text-purple-400 text-center">
        Sign a Message
      </h2>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="message" className="mb-2 text-sm font-medium text-purple-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="The quick brown fox…"
            required
            className="px-4 py-2 border border-gray-600 bg-gray-700 text-purple-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 rounded-lg font-semibold transition duration-200 ease-in-out transform ${isPending ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 hover:scale-105'} text-white`}
        >
          {isPending ? "Check Wallet" : isSuccess ? "Message Signed" : "Sign Message"}
        </button>

        {signMessageData && (
          <div className="text-sm text-purple-300 mt-2 text-center break-words whitespace-pre-wrap text-wrap">
            <div>Recovered Address: <span className="font-mono">{recoveredAddress}</span></div>
            <div>Signature: <span className="font-mono text-wrap">{signMessageData}</span></div>
          </div>
        )}

        {isPending && (
          <div className="text-yellow-400 mt-2 text-center">Waiting for confirmation...</div>
        )}

        {isSuccess && (
          <div className="text-green-400 mt-2 text-center">Message signed successfully!</div>
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
