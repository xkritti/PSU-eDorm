import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import config from "./config";
import firebase from "firebase/app";
import "firebase/firestore";
import { Provider } from "react-redux";
import store from "./components/redux/store";

const AppWithRounter = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

export const firestore = firebase.firestore();

ReactDOM.render(<AppWithRounter />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
