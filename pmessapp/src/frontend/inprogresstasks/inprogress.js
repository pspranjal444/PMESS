import Modal from "antd/lib/modal/Modal";
import Axios from "axios";
import React, { Component } from "react";
import backend_url from "../../url/backend_url";
import severity from "../mechanic/equipmentseverity";

class InProgress extends Component {
  constructor() {
    super();
    this.state = {
      mss: [],
      visibleOne: false,
      visibleTwo: false,
      repairLogs: [],
    };
  }

  componentDidMount() {
    Axios.get(backend_url + "/maintenance/all/incomplete").then((result) => {
      this.setState({
        mss: result.data.result,
      });
    });
  }

  render() {
    const severityColor = {
      L: "green",
      M: "yellow",
      C: "red",
    };
    let repairLogData = "";
    if (this.state.repairLogs) {
      repairLogData = this.state.repairLogs.map((repairLog) => {
        return (
          <tr key={repairLog._id}>
            <td style={{ textAlign: "center" }}>{repairLog.part}</td>
            <td
              style={{
                textAlign: "center",
                backgroundColor: severityColor[repairLog.severity],
              }}
            >
              <strong>{severity[repairLog.severity]}</strong>
            </td>
            <td style={{ textAlign: "center" }}>
              {new Date(repairLog.reviewedDate).toLocaleDateString()}
            </td>
            <td style={{ textAlign: "center" }}>
              <a
                href="#"
                onClick={() => {
                  this.setState({
                    visibleOne: false,
                    visibleTwo: true,
                  });
                }}
              >
                More
              </a>
            </td>
            <Modal
              title={"Equipment Id: " + repairLog.equipment_id}
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
              <div class="container">
                <p>
                  <strong>Problem:</strong> {repairLog.problem}
                </p>
                <p>
                  <strong>Corrective Action:</strong>{" "}
                  {repairLog.correctiveAction}
                </p>
                <p>
                  <strong>Mechanic Id:</strong> {repairLog.mechanic_id}
                </p>
              </div>
            </Modal>
          </tr>
        );
      });
    }

    let data = this.state.mss.map((ms) => {
      return (
        <tr key={ms._id}>
          <td style={{ textAlign: "center" }}>{ms.equipment_id}</td>
          <td style={{ textAlign: "center" }}>
            {ms.mechanic_id + " is working"}
          </td>
          <td style={{ textAlign: "center" }}>
            <a
              href="#"
              onClick={() => {
                Axios.get(backend_url + "/repair/all/maintenance", {
                  params: { maintenance_id: ms._id },
                }).then((result) => {
                  this.setState({
                    visibleOne: true,
                    repairLogs: result.data.result,
                  });
                });
              }}
            >
              More
            </a>
          </td>
          <Modal
            title="Details"
            visible={this.state.visibleOne}
            onOk={() => {
              this.setState({
                visibleOne: false,
              });
            }}
            onCancel={() => {
              this.setState({
                visibleOne: false,
              });
            }}
            width={1000}
          >
            <p>Equipment Id: {ms.equipment_id}</p>
            <p>Mechanic Id: {ms.mechanic_id}</p>
            <p>Repair Logs:</p>
            <div class="container">
              <table class="table table-striped" style={{ width: "910px" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>Part</th>
                    <th style={{ textAlign: "center" }}>Severity</th>
                    <th style={{ textAlign: "center" }}>Reviewed Date</th>
                    <th style={{ textAlign: "center" }}>More Details</th>
                  </tr>
                </thead>
                <tbody>{repairLogData}</tbody>
              </table>
            </div>
          </Modal>
        </tr>
      );
    });
    return (
      <div class="container">
        <div class="container" style={{ width: "800px" }}>
          <table class="table table-striped">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Equipment Id</th>
                <th style={{ textAlign: "center" }}>Mechanic</th>
                <th style={{ textAlign: "center" }}>Details</th>
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default InProgress;
