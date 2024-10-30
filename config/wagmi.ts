
import {http , createConfig} from "@wagmi/core"
import {sepolia} from "@wagmi/core/chains"
import {coinbaseWallet, injected, metaMask, walletConnect} from "@wagmi/connectors"

const projectId = 'cebedab752f7844962c6b71d1f898a0b'

export const config = createConfig({
    chains: [sepolia],
    connectors: [
        walletConnect({projectId}),
       coinbaseWallet({
        appName: "NebulaWallet"
       })
    ],
    transports: {
        [sepolia.id] : http()
    },
    ssr: true,
})