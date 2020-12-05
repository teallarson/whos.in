import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          
          <main className="flex-1 mx-auto p-8">
            <Landing />
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      </Provider>
    );
  };
}

export default App;
