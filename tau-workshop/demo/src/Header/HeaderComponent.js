import React from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import './HeaderComponent.css';

export default class HeaderComponent extends React.Component {

  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  async signOut() {
    await firebase.auth().signOut();
    window.location.reload();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/">GeoTweets</a>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Link</a>
            </li>
          </ul>
          <div className="auth-menu nav-item">
            {!this.props.user ?
              <span className="nav-link"><Link to="/login">Login</Link></span> :
              <span className="nav-link" onClick={this.signOut}>Sign out</span>}
          </div>
        </div>
      </nav>
    );
  }

}