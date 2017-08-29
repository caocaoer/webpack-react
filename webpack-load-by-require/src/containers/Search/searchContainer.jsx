import React, {Component} from 'react';
import LoadContainer from '../Load/LoadContainer';

export default class Search extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="search">
                search......................
                <LoadContainer/>
            </div>
        );
    }
}