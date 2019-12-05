import { actions } from './MetamaskActions';

const initialState = {
    logged: false,
    metamaskExists: false,
    account: null,
    metamask: null,
}

const START = '_START';
const SUCCESS = '_SUCCESS';
const ERROR = '_ERROR';

function tagReducer(state = initialState, action = null) {
    switch (action.type) {
        case actions.APP_LOGGED: 
            return {
                ...state,
            }
        case actions.STORE_MAIN_ACCOUNT + START: 
            return state;
        case actions.STORE_MAIN_ACCOUNT + SUCCESS: 
            console.log(action)
            return {
                ...state,
                action
            }
        case actions.STORE_MAIN_ACCOUNT + ERROR:
            return state;

        case actions.SET_MAIN_ACCOUNT + START:
            return state;
        case actions.SET_MAIN_ACCOUNT + SUCCESS: 
            console.log(action)
            return state;
        case actions.SET_MAIN_ACCOUNT + ERROR: 
            return state;

        case actions.EXISTS_METAMASK:
            return {
                ...state,
                metamaskExists: action.value
            };

        case actions.SET_ACCOUNT:
            return {
                ...state,
                logged: true,
                account: action.account,
                metamask: action.metamask
            };

        case actions.STORE_IPFS_INSTANCE + START:
            return state;
        case actions.STORE_IPFS_INSTANCE + SUCCESS:
            // console.log(action.payload);
            window._ipfs = action.payload;
            return state;
        case actions.STORE_IPFS_INSTANCE + ERROR:
            return state;

        default:
            return state;
    }
}
export default tagReducer;