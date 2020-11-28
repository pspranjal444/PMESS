import React, { Component } from "react";
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
import {HomeOutlined, LogoutOutlined} from '@ant-design/icons';

class Sidebar extends Component {
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
        <img src="https://s-vlabs.com/wp-content/themes/mobilefirst/images/logo-footer.png" height="100px" style={{marginTop: "35px", width:"150px", marginLeft:"60px", marginBottom:"30px"}}/>
          <Menu iconShape="square">
            <a href="/home">
                <MenuItem icon={<HomeOutlined/>} onClick={this.handleNavClick} style={{fontSize:"18px"}}>Home </MenuItem>
            </a>
            <MenuItem icon={<LogoutOutlined/>} onClick={this.handleLogout} style={{fontSize:"18px"}}> Logout</MenuItem>
          </Menu>
        </ProSidebar>
      </div>
    );
  }
}

export default Sidebar;
