import { connect } from "react-redux";
import PostView from "../components/PostView";
import { postViewActions } from "../redux/AppActions";

export default connect(
    state => ({
        singlePost: state.AppReducer.singlePost,
        isLoadingShowPost: state.AppReducer.isLoadingShowPost,
        unlockedLink: state.AppReducer.unlockedLink,
        account: state.MetamaskReducer.account
    }),
    postViewActions()
)(PostView);
