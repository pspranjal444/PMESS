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
    // this.handleNavClick = this.handleNavClick.bind(this);
  }

  // handleNavClick = (event) => {
  //     //event.preventDefault();
  //     console.log('test');
  // }

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
        <img src="https://s-vlabs.com/wp-content/themes/mobilefirst/images/logo-footer.png" height="120px" style={{marginTop: "15px"}}/>
          <Menu iconShape="square">
            <a href="/home">
                <MenuItem icon={<HomeOutlined/>} onClick={this.handleNavClick}>Home </MenuItem>
            </a>
            {/* <b>
              {" "}
              <MenuItem onClick={this.handleNavClick}>Add User</MenuItem>{" "}
            </b>
            <SubMenu title="Equipments">
              <a href="/addequipment">
                <MenuItem>Add Equipment</MenuItem>
              </a>

              <MenuItem>Edit Equipment</MenuItem>
            </SubMenu>
            <MenuItem onClick={this.handleNavClick}>Reports</MenuItem> */}
            <MenuItem icon={<LogoutOutlined/>} onClick={this.handleLogout}> Logout</MenuItem>
          </Menu>
        </ProSidebar>
      </div>
    );
  }
}

export default Sidebar;
