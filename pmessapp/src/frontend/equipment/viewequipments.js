import Axios from "axios";
import React, { Component } from "react";
import backend_url from "../../url/backend_url";
import { Modal, Button, Menu, Dropdown, message } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
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
              <Button
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
                              style={{ width: "910px" }}
                            >
                              <thead>
                                <tr>
                                  <th style={{ textAlign: "center" }}>Part</th>
                                  <th style={{ textAlign: "center" }}>
                                    Severity
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Mechanic Id
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Reviewed Date
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Details
                                  </th>
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
              <CheckCircleTwoTone twoToneColor="#52c41a"></CheckCircleTwoTone>
            </td>
            <Modal
              title="Repair Details"
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
              width={1000}
            >
              <p>
                <strong>Problem:</strong> {this.state.problem}
              </p>
              <p>
                <strong>Corrective Action:</strong>{" "}
                {this.state.correctiveAction}
              </p>
            </Modal>
          </tr>
        );
      });
    }

    return (
      <div class="container">
        <div style={{ marginTop: "50px", marginLeft: "400px" }}>
          <label>
            Please select an equipment from the dropdown:&nbsp;&nbsp;
          </label>
          <Dropdown.Button
            overlay={
              <Menu
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
              title={this.state.equipmentName}
              visible={this.state.visibleOne}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              width={1000}
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
            <table class="table table-borderless" style={{ border: "None" }}>
              <tbody>
                <tr>
                  <td>
                    <strong>Equipment Id:</strong> {this.state.equipment_id}
                  </td>
                  <td>
                    <strong>Equipment Name:</strong> {this.state.equipmentName}
                  </td>
                  <td>
                    <strong>Serial No:</strong> {this.state.serialNo}{" "}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Maintenance Frequency:</strong>{" "}
                    {frequencyConvert[this.state.maintenanceFrequency]}
                  </td>
                  <td>
                    <strong>Next Due Date:</strong> {this.state.dueDate}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <p>
              <strong>History of maintenance schedules:</strong>
            </p>
            <div class="container" style={{ width: "800px" }}>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>Mechanic Id</th>
                    <th style={{ textAlign: "center" }}>Complete Date</th>
                    <th style={{ textAlign: "center" }}>In Progress?</th>
                    <th style={{ textAlign: "center" }}>View Repairs</th>
                  </tr>
                </thead>
                <tbody>{mss}</tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Equipments;
