import { useState } from "react";
import ViewBalance from "./ViewBalance";
import { Hex } from "viem";

const AddressBalance = () => {
  const [address, setAddress] = useState("");
  const [submittedAddress, setSubmittedAddress] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedAddress(address);
  };

  return (
    <div className="w-full flex flex-col  bg-gradient-to-r h-min from-gray-800 via-gray-900 to-black text-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold text-purple-400 text-center">Check Wallet Balance</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address"
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-purple-400 focus:outline-none transition duration-200 ease-in-out"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 rounded-lg transition-colors duration-200 ease-in-out"
        >
          Submit
        </button>
      </form>
      {submittedAddress && <ViewBalance address={submittedAddress as Hex} />}
    </div>
  );
};

export default AddressBalance;
