import { connect } from "react-redux";
import CreatePostView from "../components/CreatePostView";
import { createPostActions } from "../redux/AppActions";

export default connect(
    state => ({
        logged: state.MetamaskReducer.logged,
        name: state.AppReducer.name,
        description: state.AppReducer.description,
        url: state.AppReducer.url,
        account: state.MetamaskReducer.account,
        isLoadingSavePost: state.AppReducer.isLoadingSavePost
    }),
    createPostActions()
)(CreatePostView);
