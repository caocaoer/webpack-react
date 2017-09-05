import './home.scss';
import React, { Component } from 'react';
import EchartDemo from '../../components/echartDemo/EchartDemo';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home">
                <EchartDemo/>
            </div>
        );
    }
}