import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Globalpage from './Pages/Global.page'
import 'semantic-ui-css/semantic.min.css'
import {
    BrowserRouter as Router
} from 'react-router-dom'
import store from './store'
import {Provider} from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Provider store={store}>
            <Globalpage>
                <App />
            </Globalpage>
        </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
