import * as firebase from 'firebase/app';
import 'firebase/auth';

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import HomeComponent from './HomeComponent';
import AuthPage from './auth/AuthPage';
import HeaderComponent from './Header/HeaderComponent';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this.initFirebase = this.initFirebase.bind(this);
    this.initFirebase();
  }

  initFirebase() {
    const firebaseConfig = {
      apiKey: "",
      authDomain: "geo-tweets.firebaseapp.com",
      // authDomain: "localhost:3000",
      databaseURL: "https://geo-tweets.firebaseio.com",
      projectId: "geo-tweets",
      storageBucket: "geo-tweets.appspot.com",
      messagingSenderId: "",
      appId: ""
    };

    // Make sure firebase isn't running already
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
      }
      else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="App container-fluid d-flex flex-column">
          <HeaderComponent user={this.state.user} />

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <AuthPage />
            </Route>
            <Route path="/">
              <HomeComponent user={this.state.user} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}