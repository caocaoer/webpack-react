
import './frame.scss';
import React, { Component } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Loading from '../../components/loading/Loading';

/**
 * @desc 页面整体框架组件
 */
export default class Frame extends Component {

    render() {
        return (
            <div className="frame">
                <Loading />
                <Header />
                <div className="wrapper">
                    <div className="container clearfix">
                        {this.props.children}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

