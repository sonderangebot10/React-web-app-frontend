import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

class Account extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <div className="acc">
          <h3>Account</h3>
          <hr />
         <Link to="/login">
           <Button variant="contained" color="secondary" >
            Logout
           </Button>
         </Link>
        </div>
      );
  }
}

export default Account;