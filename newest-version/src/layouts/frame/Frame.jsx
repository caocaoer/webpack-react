/**
 * author @caoyan
 * time 2018-07-03
 */
import styles from './frame.scss';
import CSSModules from 'react-css-modules';
import React, { Component } from 'react';

class Frame extends Component {
    render () {
        return (
            <div styleName="frame">frame..................</div>
        )
    }
}

export default CSSModules(Frame, styles);