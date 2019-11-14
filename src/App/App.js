import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Edit from './pages/Edit'
import Account from './pages/Account'
import Login from './pages/Login'

import Footer from './components/Footer'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';

export default function NavBar() {
  return (
<Router>
<header class="container">
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <h1 class="navbar-brand">HomeSwitch</h1>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
     <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto col-sm-12 text-xl-left">
      <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <Link to="/account" class="nav-link">Account</Link>
        </li>
        <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          {/* NavLink can be used for activeStyle when an item is active */}
          <Link to="/" class="nav-link">Dashboard</Link>
        </li>
        <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <Link to="/modify" class="nav-link">Edit Devices</Link>
        </li>
        <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
          <Link to="/about" class="nav-link">About</Link>
        </li>
      </ul>
    </div>
</nav>
</header>

<hr /> 
<div id='closeNavBar' onClick={handleClick}>
<section class="container">
  <Switch>
    <Route exact path="/login" component={Login}/>
    <PrivateRoute exact path="/" component={Dashboard}/>
    <PrivateRoute exact path="/account" component={Account}/>
    <PrivateRoute path="/modify" component={Edit}/>
    <Route path="/about" component={About}/>
  </Switch>
</section>

<footer>
  <Footer/>
</footer>
</div>
</Router>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
      localStorage.getItem('user')
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

function handleClick(e) {
  $(".navbar-collapse").collapse('hide');
}