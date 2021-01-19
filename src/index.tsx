import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { store } from "./store";
import { history } from "./store/history";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/style.scss';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
 ),
  document.getElementById("root")
);