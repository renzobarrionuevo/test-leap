import { useState } from "react";
import {
  CrossChainSwapsTab,
  BridgeUSDCTab,
  SwapTab,
  TransferTab,
  ThemeContextProvider,
  ThemeDefinition,
  WalletClientContextProvider,
  darkTheme,
} from "@leapwallet/elements";
import "@leapwallet/elements/styles.css";
import { useElementsWalletClient } from "./wallet";
import "@interchain-ui/react/styles";
import { useChain } from "@cosmos-kit/react";

const customElementsTheme: ThemeDefinition = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    primary: "#AC4BFF",
  },
  fontFamily: "Inter",
};

const CustomLiquidity = () => {

  const a = useChain("evmos");
  const walletClient = useElementsWalletClient();
  const userAddress = a.address ? a.address : "";
  
  const connectWallet = async function (chainId: string | undefined) {
    a.openView();
    await a.connect();

  };

  const walletClientConfig = {
    walletClient,
    connectWallet,
    userAddress,
  };

  const [activeTab, setActiveTab] = useState<
    "cosmos-swaps" | "ibc-transfer" | "evm-swaps" | "usdc-briding"
  >("cosmos-swaps");

  return (
    <div>
      <ThemeContextProvider theme={customElementsTheme}>
        <WalletClientContextProvider value={walletClientConfig}>
          <div className="flex flex-col bg-neutral-900 rounded-lg  border border-neutral-800  p-4 mb-4">
            <button
              className={`${
                activeTab === "cosmos-swaps"
                  ? "bg-purple-700"
                  : "bg-neutral-800"
              } text-white px-4 py-2 mb-2 rounded border border-neutral-800 hover:border-purple-500`}
              onClick={() => setActiveTab("cosmos-swaps")}
            >
              Cosmos Swaps
            </button>
            <button
              className={`${
                activeTab === "ibc-transfer"
                  ? "bg-purple-700"
                  : "bg-neutral-800"
              } text-white px-4 py-2 mb-2 rounded border border-neutral-800 hover:border-purple-500`}
              onClick={() => setActiveTab("ibc-transfer")}
            >
              IBC Transfer
            </button>
            <button
              className={`${
                activeTab === "evm-swaps" ? "bg-purple-700" : "bg-neutral-800"
              } text-white px-4 py-2 mb-2 rounded border border-neutral-800 hover:border-purple-500`}
              onClick={() => setActiveTab("evm-swaps")}
            >
              EVM Swaps
            </button>
            <button
              className={`${
                activeTab === "usdc-briding"
                  ? "bg-purple-700"
                  : "bg-neutral-800"
              } text-white px-4 py-2 mb-2 rounded border border-neutral-800 hover:border-purple-500`}
              onClick={() => setActiveTab("usdc-briding")}
            >
              Bridge USDC
            </button>
          </div>
          {activeTab === "cosmos-swaps" && <SwapTab />}
          {activeTab === "ibc-transfer" && <TransferTab />}
          {activeTab === "evm-swaps" && <CrossChainSwapsTab />}
          {activeTab === "usdc-briding" && <BridgeUSDCTab />}
        </WalletClientContextProvider>
      </ThemeContextProvider>
    </div>
  );
};

export default CustomLiquidity;
