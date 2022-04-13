import React, { Component } from "react";
import { render } from "react-dom";
import App from "./App.jsx";
import { createBrowserHistory } from 'history';

import styles from "./css/styles.scss";


const replaceHashPath = () => {
  const history = createBrowserHistory()
  const hash = history.location.hash
  if (hash) {
    const path = hash.replace(/^#/, '')
    if (path) {
      history.replace(path)
    }
  }
}
replaceHashPath()


// import styles from "../public/css/styles.scss";

render(<App />, document.getElementById("root"));
