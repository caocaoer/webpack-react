/**
 * author @caoyan
 * time 2018-07-03
 */
import styles from './product.scss';
import CSSModules from 'react-css-modules';
import React, { Component } from 'react';

class Product extends Component {
    render () {
        return (
            <div styleName="product">product=============</div>
        )
    }
}

export default CSSModules(Product, styles);