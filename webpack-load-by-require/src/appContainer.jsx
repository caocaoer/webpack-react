import React, {Component} from 'react';
import {Link} from 'react-router';

export default class appContainer extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="app">
                app......................
                <Link to={'search'}>搜索跳转</Link>
                <br/>
                <Link to={'load'}>load跳转</Link>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}