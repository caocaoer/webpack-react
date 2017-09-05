import './systemError.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SystemError extends Component {
    render() {
        return (
            <div className="system-error">
                <h1>系统错误</h1>
                <Link to="/">返回首页</Link>
            </div>
        );
    }
}
