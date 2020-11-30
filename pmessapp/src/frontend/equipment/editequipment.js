import Modal from "antd/lib/modal/Modal";
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import backend_url from "../../url/backend_url";
import frequency from "../../utility/frequency";
import frequencyConvert from "../../utility/frequencyConvert";
import Axios from "axios";

class EditEquipment extends Component {
  constructor() {
    super();
    this.state = {
      equipments: [],
      equipment_id: "",
      equipmentName: "",
      serialNo: "",
      maintenanceFrequency: 0,
      _id: "",
      visible: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    Axios.get(backend_url + "/equipment/all").then((result) => {
      this.setState({
        equipments: result.data.result,
      });
    });
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onClick = (event) => {
    event.preventDefault();
    const data = {
      _id: this.state._id,
      equipment_id: this.state.equipment_id,
      equipmentName: this.state.equipmentName,
      serialNo: this.state.serialNo,
      maintenanceFrequency: this.state.maintenanceFrequency,
    };

    Axios.patch(backend_url + "/equipment/edit", { data }).then((res) => {
      if (res.data.success && res.status == 200) {
        alert(res.data.message);
      } else {
        alert("Equipment could not be added successfully");
      }
    });
  };

  render() {
    let data = this.state.equipments.map((equipment) => {
      return (
        <tr key={equipment._id}>
          <td style={{ textAlign: "center" }}>{equipment.equipment_id}</td>
          <td style={{ textAlign: "center" }}>{equipment.equipmentName}</td>
          <td style={{ textAlign: "center" }}>{equipment.serialNo}</td>
          <td style={{ textAlign: "center" }}>
            {frequencyConvert[equipment.maintenanceFrequency]}
          </td>
          <td style={{ textAlign: "center" }}>
            <a
              style={{color:"#0779E4"}}
              href="#"
              onClick={() => {
                this.setState({
                  visible: true,
                  _id: equipment._id,
                  equipment_id: equipment.equipment_id,
                  equipmentName: equipment.equipmentName,
                  serialNo: equipment.serialNo,
                  maintenanceFrequency: equipment.maintenanceFrequency,
                });
              }}
            >
              Edit
            </a>
          </td>
          <Modal
            bodyStyle={{backgroundColor:"#C8E6F5"}}
            visible={this.state.visible}
            onOk={() => {
              this.setState({
                visible: false,
              });
            }}
            onCancel={() => {
              this.setState({
                visible: false,
              });
            }}
          >
            <form>
              <div class="form-group">
                <label for="equipment_id" style={{fontSize:"17px", color: "#393E46"}}>Equipment Id</label>
                <input
                  type="text"
                  class="form-control"
                  id="equipment_id"
                  name="equipment_id"
                  placeholder="e.g., FA10800"
                  onChange={this.onChange}
                  value={this.state.equipment_id}
                  style={{borderRadius:"20px"}} 
                />
              </div>

              <div class="form-group">
                <label for="equipmentName" style={{fontSize:"17px", color: "#393E46"}}>Equipment Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="equipmentName"
                  name="equipmentName"
                  placeholder="e.g., Heat Tunnel"
                  onChange={this.onChange}
                  value={this.state.equipmentName}
                  style={{borderRadius:"20px"}} 
                />
              </div>

              <div class="form-group">
                <label for="serialNo" style={{fontSize:"17px", color: "#393E46"}}>Serial Number</label>
                <input
                  type="text"
                  class="form-control"
                  id="serialNo"
                  name="serialNo"
                  placeholder="e.g., HTN89AX4"
                  onChange={this.onChange}
                  value={this.state.serialNo}
                  style={{borderRadius:"20px"}} 
                />
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1" style={{fontSize:"17px", color: "#393E46"}}>Maintenance Frequency</label>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{borderRadius:"20px", width:"90px"}} 
                  >
                    {frequencyConvert[this.state.maintenanceFrequency]}
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => {
                        document.getElementById("dropdownMenu2").innerHTML =
                          "Weekly";
                        this.setState({
                          maintenanceFrequency: frequency.WEEKLY,
                        });
                      }}
                    >
                      Weekly
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => {
                        document.getElementById("dropdownMenu2").innerHTML =
                          "Monthly";
                        this.setState({
                          maintenanceFrequency: frequency.MONTHLY,
                        });
                      }}
                    >
                      Monthly
                    </button>
                    <button
                      class="dropdown-item"
                      type="button"
                      onClick={() => {
                        document.getElementById("dropdownMenu2").innerHTML =
                          "Annually";
                        this.setState({
                          maintenanceFrequency: frequency.ANNUALLY,
                        });
                      }}
                    >
                      Annually
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                onClick={this.onClick}
                
                style={{backgroundColor:"#595B83", color:"white", borderRadius:"20px", borderColor:"#595B83",fontSize:"16px", marginLeft:"160px", width:"130px"}} 
              >
                Submit
              </button>
            </form>
          </Modal>
        </tr>
      );
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
        <h2 style={{textAlign:"center" , color: "#393E46", marginTop: "80px", fontSize:"32px"}}>
          Update Equipment
        </h2>
        <table
          class="table table-striped"
          style={{ marginTop: "50px", marginLeft: "30px", width:"1000px" }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Equipment Id</th>
              <th style={{ textAlign: "center" }}>Equipment Name</th>
              <th style={{ textAlign: "center" }}>Serial Number</th>
              <th style={{ textAlign: "center" }}>Maintenance Frequency</th>
              <th style={{ textAlign: "center" }}>Edit</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
      </div>
     </div> 
    );
  }
}

export default EditEquipment;
