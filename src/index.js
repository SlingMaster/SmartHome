import React from 'react';
import ReactDOM from 'react-dom';
import App from "./Containers/App";
import registerServiceWorker from './registerServiceWorker';
// redux ---------------------------------
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./Reducers/index";
const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

registerServiceWorker();
