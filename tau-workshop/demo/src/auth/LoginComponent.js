import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from 'react-router-dom';

export default class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showError: false,
      redirectUrl: null
    };

    this.login = this.login.bind(this);
  }

  login() {
    if (this.state.loading) return;
    this.setState({ loading: true, showError: false });

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
      this.setState({ redirectUrl: '/' });
    }).catch(err => {
      this.setState({ loading: false, showError: true });
    });
  };

  render() {
    if (this.state.redirectUrl) {
      return <Redirect to={this.state.redirectUrl} />;
    }
    
    return (
      <form className="LoginForm">
        <div className="form-group">
          <input className="form-control" type="text" id="email" placeholder="your@email.com" />
        </div>
        <div className="form-group">
          <input className="form-control" type="password" id="password" placeholder="********" />
        </div>
        {this.state.showError ? <div className="ErrorMessage">Invalid email or password</div> : null}
        <button onClick={this.login} className={"btn btn-primary" + (this.state.loading ? " disabled" : "")}>Login</button>
      </form>
    );
  }

}