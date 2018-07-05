import React from 'react';
import { render } from 'react-dom';
import Frame from './layouts/frame/Frame';
import { BrowserRouter } from 'react-router-dom';

render(
    <BrowserRouter>
        <Frame/>
    </BrowserRouter>,
    document.getElementById('app')
);