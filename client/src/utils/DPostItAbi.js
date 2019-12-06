export const ContractAbi = [
    {
        constant: false,
        inputs: [
            {
                internalType: "uint256",
                name: "postIndex",
                type: "uint256"
            }
        ],
        name: "deletePost",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "uint256",
                name: "postIndex",
                type: "uint256"
            }
        ],
        name: "payForAccess",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        payable: true,
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "",
                type: "string"
            }
        ],
        name: "ReturnPostFileUrl",
        type: "event"
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string"
            },
            {
                internalType: "string",
                name: "description",
                type: "string"
            },
            {
                internalType: "string",
                name: "url",
                type: "string"
            }
        ],
        name: "savePost",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "uint256",
                name: "postIndex",
                type: "uint256"
            }
        ],
        name: "getPost",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "listPosts",
        outputs: [
            {
                internalType: "string",
                name: "data",
                type: "string"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    }
];

// Ropsten contract
export const contractAddress = "0x2D9101781ECbFE297019351307487122455c8Cec";
// Ganache contract
// export const contractAddress = "0xb0b14b31e1549127e1ca041a4270282ce2300641";
