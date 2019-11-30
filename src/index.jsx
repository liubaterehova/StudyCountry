import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import axios from "axios";
import makeApi from "./api";
import { createBrowserHistory } from "history";
import configureStore from "./store";

import "./index.css";
import * as serviceWorker from "./serviceWorker";

import Navigation from "./components/organisms/Navigation";
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
      <Template history={history}>
        <Navigation />
      </Template>
    </Provider>,
    rootElement
  );

  serviceWorker.unregister();
};

configure();
