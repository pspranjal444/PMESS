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
            height="120px"
            style={{ marginTop: "15px" }}
          />
          <Menu iconShape="square">
            <MenuItem icon={<HomeOutlined />} key="1">
              <Link to="/home">Home</Link>
            </MenuItem>
            <SubMenu icon={<UserOutlined />} title="Users">
              <MenuItem key="2">
                <Link to="/signup">Add User</Link>
              </MenuItem>
              <MenuItem key="3">
                <Link to="/viewusers">View Users</Link>
              </MenuItem>
            </SubMenu>
            <SubMenu icon={<ControlOutlined />} title="Equipments">
              <MenuItem key="4">
                <Link to="/addequipment">Add Equipment</Link>
              </MenuItem>
              <MenuItem key="5">
                <Link to="">Edit Equipment</Link>
              </MenuItem>
              <MenuItem key="6">
                <Link to="/viewequipments">View Equipments</Link>
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<BookOutlined />} onClick={this.handleNavClick}>
              Reports
            </MenuItem>
            <MenuItem icon={<LogoutOutlined />} onClick={this.handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </ProSidebar>
      </div>
    );
  }
}

export default SidebarAdmin;
