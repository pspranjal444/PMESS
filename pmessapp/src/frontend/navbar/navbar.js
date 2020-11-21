import React, { Component } from "react";
import Equipments from "../equipment/viewequipments";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import cookie from "react-cookies";
import {Link} from 'react-router-dom';
import {HomeOutlined, UserAddOutlined, LogoutOutlined, ControlOutlined, BookOutlined } from '@ant-design/icons';


class SidebarAdmin extends Component {
  constructor(props) {
    super();
  }

  handleLogout = () => {
    console.log("logout");
    cookie.remove("user_id", { path: "/" });
    cookie.remove("role", { path: "/" });
    window.location.href = "/";
  };

  render() {
    return (
      <div>
        <ProSidebar style={{ position: "fixed !important" }}>
          <img
            src="https://s-vlabs.com/wp-content/themes/mobilefirst/images/logo-footer.png"
            height="120px"
            style={{ marginTop: "15px" }}
          />
          <Menu iconShape="square">
            <Link to="/upcomingadmin">
              <MenuItem icon={<HomeOutlined/>} key="1">Home</MenuItem>
            </Link>
            <Link to="/signup">
                <MenuItem icon={<UserAddOutlined/>} key="2">Add User</MenuItem>
            </Link>
            <SubMenu icon={<ControlOutlined/>} title="Equipments">
              <Link to="/addequipment">
                <MenuItem key="3">Add Equipment</MenuItem>
              </Link>

              <MenuItem>Edit Equipment</MenuItem>
            </SubMenu>
            <MenuItem icon={<BookOutlined/>} onClick={this.handleNavClick}>Reports</MenuItem>
            <MenuItem icon={<LogoutOutlined/>} onClick={this.handleLogout}> Logout</MenuItem>
          </Menu>
        </ProSidebar>
      </div>
    );
  }
}

export default SidebarAdmin;
