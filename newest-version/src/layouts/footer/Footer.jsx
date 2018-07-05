/**
 * author @caoyan
 * time 2018-07-03
 */
import styles from './footer.scss';
import CSSModules from 'react-css-modules';
import React, { Component } from 'react';

class Footer extends Component {
    render () {
        return (
            <div styleName="footer">footer..................</div>
        )
    }
}

export default CSSModules(Footer, styles);