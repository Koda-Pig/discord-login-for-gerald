"use client";

import { SessionProvider } from "next-auth/react";
import { wagmiConfig } from "@/config/wagmi";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

type ProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

const client = new QueryClient();

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            <>{children}</>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
}
