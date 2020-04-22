import React from 'react';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.css';
import { Redirect } from 'react-router-dom';

export default class AuthPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showRegister: false
    };

    this.showRegisterForm = this.showRegisterForm.bind(this);
    this.showLoginForm = this.showLoginForm.bind(this);
  }

  showRegisterForm() {
    this.setState({ showRegister: true });
  }
  
  showLoginForm() {
    this.setState({ showRegister: false });
  }

  render() {
    if (firebase.auth().currentUser) {
      return <Redirect to="/" />;
    }

    return (
      <div className="AuthForm d-flex flex-column align-items-center">
        <nav>
          <div className="nav nav-tabs">
            <a className={"nav-item nav-link " + (this.state.showRegister ? "" : "active")} href="#nav-login" onClick={this.showLoginForm}>Login</a>
            <a className={"nav-item nav-link " + (this.state.showRegister ? "active" : "")} href="#nav-register" onClick={this.showRegisterForm}>Register</a>
          </div>
        </nav>
        {this.state.showRegister ? <RegisterComponent /> : <LoginComponent />}
      </div>
    );
  }

}