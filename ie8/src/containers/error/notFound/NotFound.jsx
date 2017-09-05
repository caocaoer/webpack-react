import './notFound.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';
import NotFoundImg from '../../../images/404.png';

export default class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
                <img src={NotFoundImg} />
            </div>
        );
    }
}
