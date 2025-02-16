import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";

export const config = createConfig({
    chains: [mainnet],
    multiInjectedProviderDiscovery: true, // Enable multiple wallet providers if needed
    ssr: false, // Disable SSR for wagmi to avoid hydration issues
    transports: {
        [mainnet.id]: http("https://mainnet.infura.io/v3/0207710a6f6f4ec188e154da6b60d1db"), // Replace with your RPC URL
    },
});

declare module "wagmi" {
    interface Register {
        config: typeof config;
    }
}
