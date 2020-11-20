import React, { Component } from 'react';
import Equipments from '../equipment/viewequipments';
import AdminNavbar from '../navbar/navbar';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

class Sidebar extends Component {
    constructor(props) {

        super();
        this.handleNavClick = this.handleNavClick.bind(this);
    }

    handleNavClick = (event) => {
        //event.preventDefault();
        console.log('test');
    }

    render() {
        return (
            <div>
                
                <ProSidebar  style={{position: "fixed !important"}}>
                <Menu iconShape="square">
                    <a href="/home">
                    <b><MenuItem  onClick={this.handleNavClick}>Home </MenuItem> </b> </a>
                       <b> <MenuItem  onClick={this.handleNavClick}>Add User</MenuItem> </b>            
                         <SubMenu title="Equipments" >
                            <a href="/addequipment">
                         <MenuItem>Add Equipment</MenuItem>
                             </a>
                    
                      <MenuItem>Edit Equipment</MenuItem>
                   
                    </SubMenu>
                    <MenuItem  onClick={this.handleNavClick}>Reports</MenuItem>
                    <MenuItem  onClick={this.handleNavClick}>Logout</MenuItem>
                </Menu>
                </ProSidebar>

            </div>
        )
    }
}

export default Sidebar;