import React from 'react';
import {Redirect} from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default class RegisterComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showError: false,
      redirectUrl: null
    };

    this.register = this.register.bind(this);
  }

  register() {
    if (this.state.loading) return;
    this.setState({ loading: true, showError: false });

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
      this.setState({ redirectUrl: '/' });
    }).catch(err => {
      this.setState({ showError: true, loading: false });
    });
  };

  render() {
    if (this.state.redirectUrl) {
      return <Redirect to={this.state.redirectUrl} />;
    }

    return (
      <form className="RegisterForm">
        <div className="form-group">
          <input className="form-control" type="text" id="email" placeholder="your@email.com" />
        </div>
        <div className="form-group">
          <input className="form-control" type="password" id="password" placeholder="********" />
        </div>
        {this.state.showError ? <div className="ErrorMessage">Invalid email</div> : null}
        <button type="submit" onClick={this.register} className={"btn btn-primary" + (this.state.loading ? " disabled" : "")}>Signup</button>
      </form>
    );
  }

}