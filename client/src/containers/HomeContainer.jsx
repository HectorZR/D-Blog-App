import { connect } from 'react-redux';
import HomeView from '../components/HomeView';
import { homeViewActions } from '../redux/AppActions';

export default connect(
    (state) => ({
        logged: state.MetamaskReducer.logged,
        account: state.MetamaskReducer.account,
        posts: state.AppReducer.posts
    }),
    homeViewActions()
)(HomeView);