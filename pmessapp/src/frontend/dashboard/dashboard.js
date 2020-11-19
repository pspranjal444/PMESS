import React, { Component } from 'react';
import Equipments from '../equipment/viewequipments';
import AdminNavbar from '../navbar/navbar';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

class Dashboard extends Component {
    constructor(props) {

        super();
        
    }

    render() {
        return (
            <div>
                {/* <AdminNavbar /> */}
                
                 <Equipments/>
            </div>
        )
    }
}

export default Dashboard;