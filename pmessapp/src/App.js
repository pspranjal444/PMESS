import React from 'react';
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

import {Route} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import WeeklyAdmin from './frontend/upcomingmaintenance/weeklyadmin';
import MonthlyAdmin from './frontend/upcomingmaintenance/monthlyadmin';
import AnnuallyAdmin from './frontend/upcomingmaintenance/annuallyadmin';

function App() {
  return (
      <BrowserRouter>
        <Route exact path='/' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/addequipment' component={AddEquipment}/>
        <Route path='/viewequipments' component={ViewEquipments}/>
        <Route path='/upcomingadmin' component={UpcomingAdmin}/>
        <Route path='/weeklyadmin' component={WeeklyAdmin}/>
        <Route path='/monthlyadmin' component={MonthlyAdmin}/>
        <Route path='/annuallyadmin' component={AnnuallyAdmin}/>
      </BrowserRouter>
  );
}

export default App;
