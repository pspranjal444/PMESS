import Axios from "axios";
import React, { Component } from "react";
import backend_url from "../../url/backend_url";
import { Helmet } from "react-helmet";
import { Modal, Button, Menu, Dropdown, message } from "antd";
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from "@ant-design/icons";
import frequencyConvert from "../../utility/frequencyConvert";
import severity from "../mechanic/equipmentseverity";

class Equipments extends Component {
  constructor() {
    super();
    this.state = {
      equipments: [],
      visibleOne: false,
      equipment_id: "",
      equipmentName: "",
      serialNo: "",
      maintenanceFrequency: "",
      dueDate: "",
      maintenanceschedules: [],
      view: false,
      repairLogs: "",
      visibleTwo: false,
      problem: "",
      correctiveAction: "",
    };
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visibleOne: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visibleOne: false,
    });
  };

  componentDidMount() {
    Axios.get(backend_url + "/equipment/all").then((result) => {
      this.setState({
        equipments: result.data.result,
      });
    });
  }

  render() {
    const severityColor = {
      L: "green",
      M: "yellow",
      C: "red",
    };

    let menu = this.state.equipments.map((equipment) => {
      return (
        <Menu.Item key={equipment.equipment_id}>
          {equipment.equipmentName}
        </Menu.Item>
      );
    });

    let mss = "";
    if (this.state.maintenanceschedules.length > 0) {
      mss = this.state.maintenanceschedules.map((ms) => {
        return (
          <tr key={ms._id}>
            <td style={{ textAlign: "center" }}>{ms.mechanic_id}</td>
            <td style={{ textAlign: "center" }}>
              {ms.maintenanceComplete
                ? new Date(ms.maintenanceCompleteDate).toLocaleDateString()
                : "In progress"}
            </td>
            <td style={{ textAlign: "center" }}>
              {ms.maintenanceComplete
                ? "Completed"
                : ms.mechanic_id + " is working"}
            </td>
            <td style={{ textAlign: "center" }}>
              <Button style={{backgroundColor:"#1B6CA8", color:"white", borderRadius:"20px", borderColor:"#1B6CA8"}}
                onClick={() => {
                  Axios.get(backend_url + "/repair/all/maintenance", {
                    params: { maintenance_id: ms._id },
                  }).then((result) => {
                    const repairLogs = result.data.result;
                    if (repairLogs) {
                      let data = repairLogs.map((repairLog) => {
                        return (
                          <tr key={repairLog._id}>
                            <td style={{ textAlign: "center" }}>
                              {repairLog.part}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                backgroundColor:
                                  severityColor[repairLog.severity],
                              }}
                            >
                              {severity[repairLog.severity]}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {repairLog.mechanic_id}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {new Date(
                                repairLog.reviewedDate
                              ).toLocaleDateString()}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <a
                                style={{color:"#0779E4"}}
                                onClick={() => {
                                  this.setState({
                                    visibleTwo: true,
                                    problem: repairLog.problem,
                                    correctiveAction:
                                      repairLog.correctiveAction,
                                  });
                                }}
                              >
                                More
                              </a>
                            </td>
                          </tr>
                        );
                      });

                      this.setState({
                        repairLogs: (
                          <div class="container">
                            <table
                              class="table table-striped"
                              style={{ width: "800px" }}
                            >
                              <thead>
                                <tr style={{fontSize:"17px", color: "#393E46"}}>
                                  <th style={{ textAlign: "center" }}>Part</th>
                                  <th style={{ textAlign: "center" }}>Severity</th>
                                  <th style={{ textAlign: "center"}}>Mechanic Id</th>
                                  <th style={{ textAlign: "center" }}>Reviewed Date</th>
                                  <th style={{ textAlign: "center"}}>Details</th>
                                </tr>
                              </thead>
                              <tbody>{data}</tbody>
                            </table>
                          </div>
                        ),
                        visibleOne: true,
                      });
                    }
                  });
                }}
              >
                Related Reports
              </Button>
            </td>
            <td>
              {ms.maintenanceComplete ? <CheckCircleTwoTone twoToneColor="#52c41a"></CheckCircleTwoTone> : <ExclamationCircleTwoTone twoToneColor="#ffdb58"></ExclamationCircleTwoTone>}
            </td>
            <Modal
              title="REPAIR DETAILS"
              bodyStyle={{backgroundColor:"#C8E6F5"}}
              visible={this.state.visibleTwo}
              onOk={() => {
                this.setState({
                  visibleOne: true,
                  visibleTwo: false,
                });
              }}
              onCancel={() => {
                this.setState({
                  visibleOne: true,
                  visibleTwo: false,
                });
              }}
              width={800}
            >
              <p style={{fontSize:"17px", color: "#393E46"}}>
                <strong>Problem:</strong> {this.state.problem}
              </p>
              <p style={{fontSize:"17px", color: "#393E46"}}>
                <strong>Corrective Action:</strong>{" "}
                {this.state.correctiveAction}
              </p>
            </Modal>
          </tr>
        );
      });
    }

    return (
      <div style={{ paddingLeft: "20%" }}>
      <Helmet>
          <style>{"body{background-color: #EEEEEE;}"}</style>
        </Helmet>  
        
        <div class="container">
         <img src="admin.png" style={{height:"50px", width:"50px", marginLeft:"870px", marginTop:"10px"}}/> <strong>Susan Doe (Administrator)</strong>
        </div> 

        <h2 style={{textAlign:"center" , color: "#393E46", marginTop: "80px", fontSize:"36px"}}>
          Equipement Details
        </h2>

      <div class="container">
        <div style={{ marginTop: "50px", marginLeft: "240px" }}>
          <label style={{fontSize:"17px", color: "#393E46"}}>
            Please select an equipment from the dropdown:&nbsp;&nbsp;
          </label>
          <Dropdown.Button
            overlay={
              <Menu style={{fontSize:"17px", color: "#393E46", width:"170px"}}
                onClick={(e) => {
                  message.info("Item Opened");
                  const equipment_id = e.key;
                  Axios.get(backend_url + "/equipment/", {
                    params: { equipment_id: equipment_id },
                  }).then((result) => {
                    const equipment_details = result.data.result;
                    console.log(equipment_details.equipment_id);
                    return Axios.get(backend_url + "/maintenance/", {
                      params: { equipment_id: equipment_id },
                    }).then((result) => {
                      this.setState({
                        equipment_id: equipment_details.equipment_id,
                        equipmentName: equipment_details.equipmentName,
                        serialNo: equipment_details.serialNo,
                        dueDate: new Date(
                          equipment_details.dueDate
                        ).toLocaleDateString(),
                        maintenanceFrequency:
                          equipment_details.maintenanceFrequency,
                        maintenanceschedules: result.data.result,
                        view: true,
                      });
                    });
                  });
                }}
              >
                {menu}
              </Menu>
            }
          >
            Select Equipment
          </Dropdown.Button>

          <>
            <Modal
              bodyStyle={{backgroundColor:"#C8E6F5"}}
              title={this.state.equipmentName}
              visible={this.state.visibleOne}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              width={870}
            >
              {this.state.repairLogs}
            </Modal>
          </>
          <br />
          <br />
          <br />
        </div>
        {this.state.view && (
          <div class="container">
            <table class="table table-borderless" style={{ border: "2px", borderRadius:"10px", backgroundColor:"#CDCDCD", width:"1060px"}}>
              <tbody>
                <tr>
                  <td style={{fontSize:"17px", color: "#393E46"}}>
                    <strong>Equipment Id:</strong> {this.state.equipment_id}
                  </td>
                  <td style={{fontSize:"17px", color: "#393E46"}}>
                    <strong>Equipment Name:</strong> {this.state.equipmentName}
                  </td>
                  <td style={{fontSize:"17px", color: "#393E46"}}>
                    <strong>Serial No:</strong> {this.state.serialNo}{" "}
                  </td>
                </tr>
                <tr>
                  <td style={{fontSize:"17px", color: "#393E46"}}>
                    <strong>Maintenance Frequency:</strong>{" "}
                    {frequencyConvert[this.state.maintenanceFrequency]}
                  </td>
                  <td style={{fontSize:"17px", color: "#393E46"}}>
                    <strong>Next Due Date:</strong> {this.state.dueDate}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <p style={{fontSize:"19px", color: "#393E46"}}>
              <strong>History of Maintenance Schedules:</strong>
            </p>
            <div class="container" style={{ width: "900px", marginLeft:"80px", marginRight:"130px" }}>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>Mechanic Id</th>
                    <th style={{ textAlign: "center" }}>Complete Date</th>
                    <th style={{ textAlign: "center" }}>In Progress?</th>
                    <th style={{ textAlign: "center" }}>View Repairs</th>
                    <th style={{ textAlign: "left" }}>Status</th>
                  </tr>
                </thead>
                <tbody>{mss}</tbody>
              </table>
            </div>
          </div>
        )}
      </div>
     </div> 
    );
  }
}

export default Equipments;
