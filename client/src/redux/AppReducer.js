import { actions } from "./AppActions";

const initialState = {
    posts: [],
    singlePost: {},
    newPostIndex: null,
    unlockedLink: "",
    error: null,
    errorMessage: null,
    isLoading: false
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

        case actions.SHOW_POST + START:
            return {
                ...state,
                isLoading: true
            };
        case actions.SHOW_POST + SUCCESS:
            return {
                ...state,
                singlePost: JSON.parse(action.payload),
                isLoading: false
            };
        case actions.SHOW_POST + ERROR:
            console.log(action);
            return {
                ...state,
                isLoading: false,
                singlePost: {
                    name: "Post not found",
                    description: "This post not exists"
                }
            };

        case actions.PAY_FOR_GETTING_LINK + START:
            return state;
        case actions.PAY_FOR_GETTING_LINK + SUCCESS:
            return {
                ...state,
                unlockedLink: JSON.parse(
                    action.payload.events.ReturnPostFileUrl.returnValues[0]
                )
            };
        case actions.PAY_FOR_GETTING_LINK + ERROR:
            return {
                ...state,
                error: "Error getting file try again"
            };
        default:
            return state;
    }
}
export default tagReducer;
