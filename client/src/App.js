import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ChangePassword from './components/auth/ChangePassword';
import PrivateRoute from "./components/common/PrivateRoute";
import store from './store';
import { logoutProvider } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import { SET_PROVIDER } from './actions/types';

if (localStorage.jwtToken) {
  //decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //check expiry
  const currentTime = Date.now()/1000;
  if (decoded.exp < currentTime) {
    //expired
    //logout user
    store.dispatch(logoutProvider());
    // redirect to login
    window.location.href = '/login';
  }

  //set auth header
  setAuthToken(localStorage.jwtToken);
  //dispatch
  store.dispatch({
    type: SET_PROVIDER,
    payload: decoded,
  });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container-fluid" id="app-wrap">
            <div className="App">
              <Header />
              
              <main className="mx-auto">
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgotpw" component={ForgotPassword} />
                
                <Switch>
                <PrivateRoute
                  exact
                  path="/changepw"
                  component={ChangePassword}
                />
              </Switch>
              </main>

              <footer>
                <Footer />
              </footer>
            </div>
          </div>
        </Router>
      </Provider>
    );
  };
}

export default App;
