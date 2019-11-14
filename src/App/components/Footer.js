import React, { Component } from 'react';

class Footer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
          <div style={phantom}><footer class="footer" style={style}>
              ID2216 Mobile Applications Developement Web Application.
              </footer></div>
      );
  }
}

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "5px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

export default Footer;