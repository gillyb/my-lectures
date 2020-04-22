import React from 'react';

import './Tweets.css';

export default class TweetsList extends React.Component {

  render() {
    return (
      <div className="TweetsList">
        {this.props.tweets.map(tweet => {
          return (
            <div className="Tweet card" key={tweet.id}>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>{tweet.tweet}</p>
                  <footer className="blockquote-footer">By: {tweet.userEmail}</footer>
                </blockquote>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

}