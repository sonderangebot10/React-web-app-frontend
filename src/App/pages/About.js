import React, { Component } from 'react';

class About extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <div className="abt">
          <h3>About</h3>
          <hr />
          Technologies used:
          <ul>
            <li>ReactJs</li>
            <li>NodeJs</li>
            <li>Express</li>
            <li>Bootstrap</li>
            <li>MaterialUI</li>
          </ul>
        </div>
      );
  }
}

export default About;