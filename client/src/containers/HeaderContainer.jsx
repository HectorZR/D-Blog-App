import { connect } from "react-redux";
import Header from "../components/Header";
import { metamaskActions } from "../redux/MetamaskActions";
import { homeViewActions } from "../redux/AppActions";

export default connect(
    state => ({
        logged: state.MetamaskReducer.logged
    }),
    {
        ...metamaskActions(),
        ...homeViewActions()
    }
)(Header);
