import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Frame from '../layouts/frame/Frame';
import Home from '../containers/home/Home';
import NotFound from '../containers/error/notFound/NotFound';
import SystemError from '../containers/error/systemError/SystemError';

export default class Root extends Component {
    render() {
        return (
            <Router history={ hashHistory } >
                <Route path="/" component={Frame}>
                    <IndexRoute component={Home} />
                    <Route path="/systemError" component={SystemError} />
                    <Route path="*" component={NotFound} />
                </Route>
            </Router>
        );
    }
}