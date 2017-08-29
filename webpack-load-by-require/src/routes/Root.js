import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import AppContainer from '../appContainer'
import HomeContainer from '../containers/Home/homeContainer'

const searchContainer = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/Search/searchContainer').default)
    }, 'search')
}
const LoadContainer = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/Load/LoadContainer').default)
    }, 'load')
}

export default class Root extends Component {
    render() {
        return (
            <Router history={hashHistory} >
                <Route path="/" component={AppContainer}>
                    <IndexRoute component={HomeContainer} />
                    <Route path="/home" component={HomeContainer} />
                    <Route path="/search" getComponent={searchContainer} />
                    <Route path="/load" getComponent={LoadContainer} />
                </Route>
            </Router>
        );
    }
}