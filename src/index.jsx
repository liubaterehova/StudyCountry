import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import axios from "axios";
import makeApi from "./api";
import { createBrowserHistory } from "history";
import configureStore from "./store";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import InputPage from "./components/pages/InputPage";

import ConnectedInputPage from "./containers/ConnectInputPage";
import Navigation from "./components/pages/Navigation";
import Template from "./components/template";
// const state = {
//   router: {},
//   custom: {
//     isLoading: false,
//     error: null,
//     countries: [],
//     weathers: [],
//     holidays: []
//   }
// };

const configure = async () => {
  const history = createBrowserHistory();
  //const headersManager = makeHeadersManager({ authManager });

  const api = makeApi({ client: axios });
  const store = configureStore({ api, history });

  // const JWTcreds = authManager.getCredentials();

  // actions.getJwtDecoded({decodedJWT:JWTcreds})
  // if (JWTcreds) {
  //     localStorage.setItem('token', JWTcreds);
  //     history.push('/dash');
  // }

  const rootElement = document.getElementById("root");

  ReactDOM.render(
    <Provider store={store}>
      <Template history={history} />
      {/* <ConnectedInputPage history={history} /> */}
    </Provider>,
    rootElement
  );

  serviceWorker.unregister();
};

configure();
