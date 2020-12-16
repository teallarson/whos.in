import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ChangePassword from './components/auth/ChangePassword';
import PrivateRoute from "./components/common/PrivateRoute";
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
                <Route exact path="/forgotPassword" component={ForgotPassword} />
                <Route exact path="/forgotPassword" component={ForgotPassword} />
                <Switch>
                <PrivateRoute
                  exact
                  path="/changePassword"
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
