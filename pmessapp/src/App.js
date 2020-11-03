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

import {Route} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Route exact path='/' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/addequipment' component={AddEquipment}/>
        <Route path='/viewequipments' component={ViewEquipments}/>
      </BrowserRouter>
  );
}

export default App;
