export const actions = {
    APP: "APP",
    GET_POSTS: "GET_POSTS",
    SAVE_POST: "SAVE_POST",
    EDIT_INPUT: "EDIT_INPUT",
    STORE_POST_WITH_FILE: "STORE_POST_WITH_FILE",
    STORE_FILE: "STORE_FILE",
    SHOW_POST: "SHOW_POST",
    PAY_FOR_GETTING_LINK: "PAY_FOR_GETTING_LINK"
};

function getPostList(payload) {
    return {
        type: actions.GET_POSTS,
        payload
    };
}

function savePostToContract(payload) {
    return {
        type: actions.SAVE_POST,
        payload
    };
}

function editInput(name, value) {
    return {
        type: actions.EDIT_INPUT,
        name,
        value
    };
}

function showPost(payload) {
    return {
        type: actions.SHOW_POST,
        payload
    };
}

function storePostWithFile(ipfsPayload, savePostPayload) {
    return dispatch =>
        dispatch({
            type: actions.STORE_POST_WITH_FILE,
            payload: ipfsPayload().then(res => {
                dispatch(savePostToContract(savePostPayload()));
                return res;
            })
        });
}

function payForGettingLink(payload) {
    return {
        type: actions.PAY_FOR_GETTING_LINK,
        payload
    };
}

export function homeViewActions() {
    return {
        getPostList
    };
}

export function createPostActions() {
    return {
        editInput,
        savePostToContract,
        storePostWithFile
    };
}

export function postViewActions() {
    return {
        showPost,
        payForGettingLink
    };
}
