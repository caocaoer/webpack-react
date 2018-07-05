/**
 * author @caoyan
 * time 2018-07-03
 */
import styles from './frame.scss';
import CSSModules from 'react-css-modules';
import React, { Component } from 'react';

import Header from '../header/Header';
import Footer from '../footer/Footer';

class Frame extends Component {
    render () {
        return (
            <div styleName="frame">
                <Header/>
                frame..................
                <Footer/>
            </div>
        )
    }
}

export default CSSModules(Frame, styles);