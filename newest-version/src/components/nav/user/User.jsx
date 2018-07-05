/**
 * author @caoyan
 * time 2018-07-03
 */
import styles from './user.scss';
import CSSModules from 'react-css-modules';
import React, { Component } from 'react';

class User extends Component {
    render () {
        return (
            <div styleName="user">user=============</div>
        )
    }
}

export default CSSModules(User, styles);