// VultaraETHVault ABI - For native ETH deposits
export const VULTARA_ETH_VAULT_ABI = [
    // Read Functions
    {
        inputs: [{ name: "user", type: "address" }],
        name: "getUserBalance",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getTVL",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ name: "shares", type: "uint256" }],
        name: "convertToAssets",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    // Write Functions
    {
        inputs: [],
        name: "deposit",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{ name: "shares", type: "uint256" }],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    // Events
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "user", type: "address" },
            { indexed: false, name: "ethAmount", type: "uint256" },
            { indexed: false, name: "shares", type: "uint256" },
        ],
        name: "DepositReceived",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: "user", type: "address" },
            { indexed: false, name: "ethAmount", type: "uint256" },
            { indexed: false, name: "shares", type: "uint256" },
        ],
        name: "WithdrawProcessed",
        type: "event",
    },
] as const;
