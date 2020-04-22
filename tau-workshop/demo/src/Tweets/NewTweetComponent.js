import * as firebase from 'firebase/app';
import 'firebase/firestore';
import React from 'react';

import './Tweets.css';

export default class NewTweetComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      saving: false
    };
    this.addTweet = this.addTweet.bind(this);
  }

  async getUserLocation() {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(userLocation => {
        // This will return a `GeolocationCoordinates` object that
        // has latitude and longitude properties.
        resolve(userLocation.coords);
      });
    });
  }

  async addTweet() {
    this.setState({ saving: true });
    const userLocation = await this.getUserLocation();

    // NOTE: If we wanted to make this secure we probably wouldn't be doing this
    //       from the client side, and we would want to validate that the email
    //       given here matches the user auth token.
    const db = firebase.firestore();
    return db.collection('tweets').add({
      userEmail: this.props.user.email,
      tweet: document.getElementById('new-tweet').value,
      longitude: userLocation.longitude,
      latitude: userLocation.latitude
    }).then(res => {
      // TODO: refresh the tweets list now
      this.setState({ saving: false });
      this.props.updateTweetsList();
      console.log('Tweet saved successfully');
    });
  }

  render() {
    return (
      <div className="NewTweetSection card border-dark mb-3">
        <div className="card-header">Say something</div>
        <div className="card-body">
          <div className="NewTweetForm">
            <input type="text" className={"form-control" + (this.state.saving ? " disabled" : "")} id="new-tweet" placeholder="What's happening?" />
            <button type="submit" className={"btn btn-primary" + (this.state.saving ? " disabled" : "")}
                onClick={async () => this.addTweet()}>Send</button>
          </div>
        </div>
      </div>
    );
  }

}