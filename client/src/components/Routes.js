import React from 'react';
import HomeContainer from '../containers/HomeContainer';
import CreatePostContainer from '../containers/CreatePostContainer';
import { Route, Switch } from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';
import NotFound from './NotFound';

export default class Routes extends React.Component{
    render() {
        return (
            <React.Fragment>
                <HeaderContainer/>
                <Switch>
                    <Route path="/" component={HomeContainer} exact/>
                    <Route path="/create-post" component={CreatePostContainer} exact/>
                    <Route path="/post/:id" component={CreatePostContainer} exact/>
                    <Route path="*" component={NotFound} exact />
                </Switch>
            </React.Fragment>
        )
    }
}