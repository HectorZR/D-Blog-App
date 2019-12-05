import { actions } from "./AppActions";

const initialState = {
    posts: [],
    newPostIndex: null,
    error: null,
    errorMessage: null
};

const START = "_START";
const SUCCESS = "_SUCCESS";
const ERROR = "_ERROR";

function tagReducer(state = initialState, action = null) {
    switch (action.type) {
        case actions.GET_POSTS + START:
            return state;
        case actions.GET_POSTS + SUCCESS:
            const postslist = JSON.parse(action.payload);
            const sortedPosts = postslist.sort((first, second) => {
                if (first.key < second.key) {
                    return 1;
                }
                if (first.key > second.key) {
                    return -1;
                }
                return 0;
            });
            return {
                ...state,
                posts: sortedPosts
            };
        case actions.GET_POSTS + ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            };

        case actions.SAVE_POST + START:
            return state;
        case actions.SAVE_POST + SUCCESS:
            return {
                ...state,
                newPostIndex: action.payload
            };
        case actions.SAVE_POST + ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.payload
            };

        case actions.EDIT_INPUT:
            return {
                ...state,
                [action.name]: action.value
            };
        default:
            return state;
    }
}
export default tagReducer;
