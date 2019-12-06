import { actions } from "./AppActions";

const initialState = {
    posts: [],
    singlePost: {},
    newPostIndex: null,
    unlockedLink: "",
    error: null,
    errorMessage: null,
    isLoading: false,
    isLoadingSavePost: false,
    isLoadingShowPost: false
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
            return {
                ...state,
                isLoadingSavePost: true
            };
        case actions.SAVE_POST + SUCCESS:
            return {
                ...state,
                newPostIndex: action.payload,
                isLoadingSavePost: false
            };
        case actions.SAVE_POST + ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.payload,
                isLoadingSavePost: false
            };

        case actions.EDIT_INPUT:
            return {
                ...state,
                [action.name]: action.value
            };

        case actions.SHOW_POST + START:
            return {
                ...state,
                isLoadingShowPost: true
            };
        case actions.SHOW_POST + SUCCESS:
            return {
                ...state,
                singlePost: JSON.parse(action.payload),
                isLoadingShowPost: false
            };
        case actions.SHOW_POST + ERROR:
            return {
                ...state,
                isLoadingShowPost: false,
                singlePost: {
                    name: "Post not found",
                    description: "This post not exists"
                }
            };

        case actions.PAY_FOR_GETTING_LINK + START:
            return {
                ...state,
                isLoadingShowPost: true
            };
        case actions.PAY_FOR_GETTING_LINK + SUCCESS:
            const response = JSON.parse(
                action.payload.events.ReturnPostFileUrl.returnValues[0]
            );
            return {
                ...state,
                singlePost: {
                    ...state.singlePost,
                    url: response.url
                },
                isLoadingShowPost: false
            };
        case actions.PAY_FOR_GETTING_LINK + ERROR:
            return {
                ...state,
                error: "Error getting file try again",
                isLoadingShowPost: false
            };
        default:
            return state;
    }
}
export default tagReducer;
