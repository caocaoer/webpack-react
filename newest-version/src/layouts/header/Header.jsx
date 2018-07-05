/**
 * author @caoyan
 * time 2018-07-03
 */
import styles from './header.scss';
import CSSModules from 'react-css-modules';
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import User from '../../components/nav/user/User';
import Product from '../../components/nav/product/Product';

class Header extends Component {
    render () {
        return (
            <div styleName="header">
                header..................
                <ul>
                    <li><Link to="/user">user...</Link></li>
                    <li><Link to="product">product...</Link></li>
                </ul>
                <Route path="/user" component={User}/>
                <Route path="/product" component={Product}/>
            </div>
        )
    }
}

export default CSSModules(Header, styles);