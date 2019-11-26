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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as customActions } from "./store/custom";

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

const mapStateToProps = state => {
  const props = {
    countries: state.custom.countries
  };
  return props;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCountries: customActions.getCountries
    },
    dispatch
  );
};

const ConnectedInputPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputPage);

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
      <ConnectedInputPage history={history} />
    </Provider>,
    rootElement
  );

  serviceWorker.unregister();
};

configure();
