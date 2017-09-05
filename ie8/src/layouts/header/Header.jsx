import './header.scss';
import smileJPG from '../../images/smile.jpg';
import React, { Component } from 'react';

/**
 * @desc 页面顶部组件
 */
export default class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                {/* 图片引入示例, 注意: import图片时一定要用相对路径, 包括css, scss文件中url()引入的图片也一样. */}
                <img src={smileJPG} width="100" height="100"/>
            </div>
        );
    }
}