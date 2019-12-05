import { connect } from "react-redux";
import Routes from "../components/Routes";

export default connect(state => ({
    logged: state.MetamaskReducer.logged,
    account: state.MetamaskReducer.account
}))(Routes);
