import React from "react";
import HomeContainer from "../containers/HomeContainer";
import { Route, Switch } from "react-router-dom";
import HeaderContainer from "../containers/HeaderContainer";
import CreatePostContainer from "../containers/CreatePostContainer";
import PostViewContainer from "../containers/PostViewContainer";
import NotFound from "./NotFound";
import Layout from "./Layout";
import Loader from "./Loader";

export default class Routes extends React.Component {
    render() {
        const { account } = this.props;
        return (
            <React.Fragment>
                <HeaderContainer />
                {account ? (
                    <Switch>
                        <Route path="/" component={HomeContainer} exact />
                        {account ? (
                            <React.Fragment>
                                <Route
                                    path="/create-post"
                                    component={CreatePostContainer}
                                    exact
                                />
                                <Route
                                    path="/post/:id"
                                    component={PostViewContainer}
                                    exact
                                />
                            </React.Fragment>
                        ) : null}

                        <Route path="*" component={NotFound} exact />
                    </Switch>
                ) : (
                    <Layout>
                        <div style={{ margin: "auto" }}>
                            <p>Initializing Metamask</p>
                            <Loader />
                        </div>
                    </Layout>
                )}
            </React.Fragment>
        );
    }
}
