import React, {Component,Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import AdminNavbar from './frontend/navbar/navbar';
import Signup from './frontend/signup/signup';
import TextInput from './frontend/components/textInput';
import AddEquipment from './frontend/equipment/addequipment';
import Dashboard from './frontend/dashboard/dashboard';
import Login from './frontend/login/login';
import ViewEquipments from './frontend/equipment/viewequipments';
import UpcomingAdmin from './frontend/upcomingmaintenance/upcomingadmin';

import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import WeeklyAdmin from './frontend/upcomingmaintenance/weeklyadmin';
import MonthlyAdmin from './frontend/upcomingmaintenance/monthlyadmin';
import AnnuallyAdmin from './frontend/upcomingmaintenance/annuallyadmin';
import ViewEquipmentsMechanic from './frontend/mechanic/viewequipments/viewlockequipments';

import Try1 from './frontend/try1';
import Sidebar from './frontend/sidebar/sidebar';
import Home from './frontend/components/home/home';

import LockedEquipments from './frontend/mechanic/viewequipments/lockedequipments';
import ReviewMaintenance from './frontend/reviewmaintenance/reviewmaintenance';

import cookie from "react-cookies";

class App extends Component {
  render() {
  return (
    <BrowserRouter>
      {/* Not Logged In  Components*/}
      {!cookie.load('user_id') &&
        <Fragment>
          {/* <Route path='/' component={Sidebar} /> */}
          <Route exact path='/' component={Login} />
          <Route path='/signup' component={Signup} />
        </Fragment>
      }
      {/* Logged In  Components*/}
      {cookie.load("user_id") &&
        <Fragment>
          <Route path='/' component={Sidebar} />
          <Route path='/home' component={Home} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/addequipment' component={AddEquipment} />
        </Fragment>}
      {/* /* <Route path='/viewequipments' component={ViewEquipments}/> */}
      <Route path='/upcomingadmin' component={UpcomingAdmin} />
      <Route path='/weeklyadmin' component={WeeklyAdmin} />
      <Route path='/monthlyadmin' component={MonthlyAdmin} />
      <Route path='/annuallyadmin' component={AnnuallyAdmin} />
      <Route path='/viewequipmentsmechanic' component={ViewEquipmentsMechanic} />
      <Route path='/lockedequipments' component={LockedEquipments} />
      <Route path='/reviewmaintenance' component={ReviewMaintenance} />


       )

    </BrowserRouter>
  );
    }
}

export default App;
