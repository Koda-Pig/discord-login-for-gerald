import "@rainbow-me/rainbowkit/styles.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./web3-login-styles.module.css";

export function Web3Login() {
  return (
    <div className={styles.container} id="#web3-rainbow-container">
      <ConnectButton />
    </div>
  );
}
