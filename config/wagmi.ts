import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia
} from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "gerald AI",
  projectId: "gerald_AI",
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : [])
  ],
  ssr: true
});
