export const actions = {
    APP_LOGGED: "APP_LOGGED",
    SET_MAIN_ACCOUNT: "SET_MAIN_ACCOUNT",
    EXISTS_METAMASK: "EXISTS_METAMASK",
    SET_ACCOUNT: "SET_ACCOUNT",
    STORE_CONTRACT: "STORE_CONTRACT",
    STORE_IPFS_INSTANCE: "STORE_IPFS_INSTANCE"
};

function storeIpfsIntance(payload) {
    return {
        type: actions.STORE_IPFS_INSTANCE,
        payload
    };
}

function setMetamask(value) {
    return {
        type: actions.EXISTS_METAMASK,
        value
    };
}

function setAccount(account, metamask) {
    return {
        type: actions.SET_ACCOUNT,
        account,
        metamask
    };
}

function metamaskLogin(web3, accounts, contractInstance) {
    return {
        type: actions.APP_LOGGED,
        web3,
        accounts,
        contractInstance
    };
}

export function metamaskActions() {
    return {
        setMetamask,
        setAccount,
        metamaskLogin,
        storeIpfsIntance
    };
}
