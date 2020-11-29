import React, { Component } from "react";
import backend_url from "../../url/backend_url";
import Axios from "axios";
import { Helmet } from "react-helmet";
import roleconvert from "./roleconvert";
import { Radio } from "antd";

class ViewUsers extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      filter: "A",
    };
  }

  componentDidMount() {
    Axios.get(backend_url + "/user/all").then((result) => {
      this.setState({
        users: result.data.result,
      });
    });
  }

  render() {
    let data = this.state.users.map((user) => {
      if (this.state.filter == user.role) {
        return (
          <tr key={user._id}>
            <td style={{ textAlign: "center" }}>{user.user_id}</td>
            <td style={{ textAlign: "center" }}>{roleconvert[user.role]}</td>
            <td style={{ textAlign: "center" }}>{user.firstName}</td>
            <td style={{ textAlign: "center" }}>{user.lastName}</td>
            <td style={{ textAlign: "center" }}>{user.phone}</td>
            <td style={{ textAlign: "center" }}>{user.email_id}</td>
          </tr>
        );
      }
    });
    return (
      <div style={{ paddingLeft: "20%" }}>
      <Helmet>
          <style>{"body{background-color: #EEEEEE;}"}</style>
        </Helmet>  
        
        <div class="container">
         <img src="admin.png" style={{height:"50px", width:"50px", marginLeft:"870px", marginTop:"10px"}}/> <strong>Susan Doe (Administrator)</strong>
        </div> 
      <div class="container">
        <h2 style={{textAlign:"center" , color: "#393E46", marginTop: "80px", fontSize:"36px"}}>
          User Details
        </h2>
        <br/>
        <br/>
        <Radio.Group defaultValue="a" buttonStyle="solid" Button type="warning" style={{marginLeft: "30px"}}>
          <Radio.Button
            style={{backgroundColor:"#c1c0b9", borderColor:"#c1c0b9", fontSize:"15px", textAlign:"center"}}
            value="a"
            onChange={() => {
              this.setState({
                filter: "A",
              });
            }}
          >
            Administrator
          </Radio.Button>
          <Radio.Button
          style={{backgroundColor:"#c1c0b9", borderColor:"#c1c0b9", fontSize:"15px", textAlign:"center"}}
            value="b"
            onChange={() => {
              this.setState({
                filter: "M",
              });
            }}
          >
            Mechanic
          </Radio.Button>
        </Radio.Group>
        <table
          class="table table-striped"
          style={{ marginTop: "50px", marginLeft: "30px", width:"1000px" }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>User Id</th>
              <th style={{ textAlign: "center" }}>Role</th>
              <th style={{ textAlign: "center" }}>First Name</th>
              <th style={{ textAlign: "center" }}>Last Name</th>
              <th style={{ textAlign: "center" }}>Phone</th>
              <th style={{ textAlign: "center" }}>Email</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
      </div>
    </div>  
    );
  }
}

export default ViewUsers;
