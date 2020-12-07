import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            
            <main className="flex-1 mx-auto p-8">
              <Route exact path="/" component={Landing} />
            </main>

            <footer>
              <Footer />
            </footer>
          </div>
        </Router>
      </Provider>
    );
  };
}

export default App;
