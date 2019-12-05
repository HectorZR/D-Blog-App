import { connect } from 'react-redux';
import Header from '../components/Header';
import { metamaskActions } from '../redux/MetamaskActions';

export default connect(
    (state) => ({
        logged: state.MetamaskReducer.logged,
    }),
    metamaskActions()
)(Header);