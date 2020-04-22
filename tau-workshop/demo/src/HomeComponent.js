import React from 'react';
import MapComponent from './Map/MapComponent';
import NewTweetComponent from './Tweets/NewTweetComponent';
import { Redirect } from 'react-router-dom';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import TweetsList from './Tweets/TweetsList';

export default class HomeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      visibleBoundingBox: null
    };
    this.updateVisibleBoundingBox = this.updateVisibleBoundingBox.bind(this);
    this.fetchTweets = this.fetchTweets.bind(this);

    this.db = firebase.firestore();
  }

  updateVisibleBoundingBox(newBoundingBox) {
    this.setState({
      visibleBoundingBox: newBoundingBox
    });
  }

  fetchTweets() {
    // NOTE: This is really bad code - don't use this example!
    const newTweets = [];
    this.db.collection('tweets').get().then(results => {
      results.forEach(r => newTweets.push({
        id: r.id,
        ...r.data()
      }));
    }).then(() => {
      this.setState({
        tweets: newTweets
      });
    });
  }

  componentDidMount() {
    this.fetchTweets();
  }

  render() {
    if (!firebase.auth().currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="d-flex flex-grow-1">
        <div className="col-4">
          <NewTweetComponent updateTweetsList={this.fetchTweets} user={this.props.user} />
          <TweetsList tweets={this.state.tweets} visibleBoundingBox={this.state.visibleBoundingBox} />
        </div>
        <div className="col-8">
          <MapComponent updateBoundingBox={this.updateVisibleBoundingBox} />
        </div>
      </div>
    );
  }

}