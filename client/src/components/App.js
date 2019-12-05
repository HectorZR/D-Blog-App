import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Routes from "../containers/RoutesContainer";
import { configureStore } from "../redux/store";

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Routes />
                </Router>
            </Provider>
        );
    }
}

export default App;
