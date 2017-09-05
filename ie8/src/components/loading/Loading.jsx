import './loading.scss';
import React, {Component} from 'react';
import classNames from 'classnames';
import {Event} from '../../constants/enum';
import emitter from '../../utils/emitter';
import loading from '../../images/loading.gif';
// var loading = require('../../images/loading.gif');

export default class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hide: true
        };
        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
    }

    componentWillMount(){
        emitter.on(Event.SHOW_LOADING, this.showLoading);
        emitter.on(Event.HIDE_LOADING, this.hideLoading);
    }

    componentWillUnmount() {
        emitter.removeListener(Event.SHOW_LOADING, this.showLoading);
        emitter.removeListener(Event.HIDE_LOADING, this.hideLoading);
    }

    showLoading(){
        if(this.state.hide){
            this.setState({
                hide: false
            });
        }
    }

    hideLoading(){
        if(!this.state.hide){
            this.setState({
                hide: true
            });
        }
    }

    render(){
        return (
            <div className={classNames({loading: true, hide: this.state.hide})}>
                <div className="loading-dialog">
                    <img src={loading} />
                </div>
            </div>
        );
    }
}