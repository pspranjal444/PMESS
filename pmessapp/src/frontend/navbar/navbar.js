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
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  ControlOutlined,
  BookOutlined,
} from "@ant-design/icons";


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
            height="100px"
            style={{ marginTop: "35px", width:"150px", marginLeft:"60px"}}
          />
          <br/>
          <br/>
          <br/>
          <Menu iconShape="square">
            <MenuItem icon={<HomeOutlined />} key="1">
              <Link to="/home" style={{fontSize:"18px"}}>Home</Link>
            </MenuItem>
            <SubMenu icon={<UserOutlined />} style={{fontSize:"18px"}} title="Users">
              <MenuItem key="2">
                <Link to="/signup" style={{fontSize:"16px"}} >Add User</Link>
              </MenuItem>
              <MenuItem key="3">
                <Link to="/viewusers" style={{fontSize:"16px"}}>View Users</Link>
              </MenuItem>
            </SubMenu>
            <SubMenu icon={<ControlOutlined />} style={{fontSize:"18px"}} title="Equipments">
              <MenuItem key="4">
                <Link to="/addequipment" style={{fontSize:"16px"}}>Add Equipment</Link>
              </MenuItem>
              <MenuItem key="5">
                <Link to="/editequipments" style={{fontSize:"16px"}}>Edit Equipment</Link>
              </MenuItem>
              <MenuItem key="6">
                <Link to="/viewequipments" style={{fontSize:"16px"}}>View Equipments</Link>
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<BookOutlined />} onClick={this.handleNavClick}>
              <Link to="/reports" style={{fontSize:"18px"}}>Reports</Link>
              
            </MenuItem>
            <MenuItem icon={<LogoutOutlined />} style={{fontSize:"18px"}} onClick={this.handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </ProSidebar>
      </div>
    );
  }
}

export default SidebarAdmin;
