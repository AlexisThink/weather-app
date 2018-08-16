import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {HashRouter} from 'react-router-dom';

class AppRouter extends React.Component{
    render() {
      return (
        <HashRouter>
            <App />
        </HashRouter>
      )
    }
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));
