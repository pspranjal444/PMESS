import React, { Component, Fragment } from "react";
import "./App.css";
import AdminNavbar from "./frontend/navbar/navbar";
import Signup from "./frontend/signup/signup";
import AddEquipment from "./frontend/equipment/addequipment";
import Dashboard from "./frontend/dashboard/dashboard";
import Login from "./frontend/login/login";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./frontend/sidebar/sidebar";
import Home from "./frontend/components/home/home";
import cookie from "react-cookies";
import ViewEquipments from './frontend/equipment/viewequipments';
import ViewUsers from './frontend/user/viewusers';

class App extends Component {
  render() {

    return (
      <BrowserRouter>
        {/* Not Logged In  Components*/}
        {!cookie.load("user_id") && (
          <Fragment>
            <Route exact path="/" component={Login} />
          </Fragment>
        )}
        {/* Logged In  Components*/}
        {cookie.load("user_id") && cookie.load("role") == "A" && (
          <Fragment>
            <Route path="/" component={AdminNavbar} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/addequipment" component={AddEquipment} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
            <Route path="/viewequipments" component={ViewEquipments}/>
            <Route path="/viewusers" component={ViewUsers}/>
          </Fragment>
        )}
        {cookie.load("user_id") && cookie.load("role") == "M" && (
          <Fragment>
            <Route path="/" component={Sidebar} />
            <Route path="/home" component={Home} />
          </Fragment>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
