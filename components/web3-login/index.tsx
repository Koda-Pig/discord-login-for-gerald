import "@rainbow-me/rainbowkit/styles.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./styles.module.css";

interface Web3LoginProps {
  isDisabled: boolean;
}

export function Web3Login({ isDisabled }: Readonly<Web3LoginProps>) {
  return (
    <div
      className={`${isDisabled ? "opacity-40 pointer-events-none" : ""} ${
        styles.container
      }`}
      id="#web3-rainbow-container"
    >
      <ConnectButton />
    </div>
  );
}
