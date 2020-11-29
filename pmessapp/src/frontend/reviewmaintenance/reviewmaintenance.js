import Axios from "axios";
import React, { Component } from "react";
import backend_url from "../../url/backend_url";
import cookie from "react-cookies";
import frequency from "../../utility/frequencyConvert";
import { Button, Modal } from "antd";
import severity from "../mechanic/equipmentseverity";

class ReviewMaintenance extends Component {
  constructor() {
    super();

    this.state = {
      equipments: [],
      equipmentDetails: "",
      visibleOne: false,
      visibleTwo: false,
      visibleThree: false,
      visibleFour: false,
      reviewRemarks: "",
      reviewOk: "",
      mechanicName: "",
      maintenance_id: "",
      equipment_id: "",
      repairLogs: [],
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    Axios.get(backend_url + "/maintenance/notreviewed").then((result) => {
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

  render() {
    const user_id = cookie.load("user_id");

    const severityColor = {
      L: "green",
      M: "yellow",
      C: "red",
    };

    const statusColor = {
      true: "red",
      false: "yellow",
    };

    let repairLogsData = this.state.repairLogs.map((repairLog) => {
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
              style={{color:"#0779E4"}}
              href="#"
              onClick={() => {
                this.setState({
                  visibleThree: false,
                  visibleFour: true,
                });
              }}
            >
              More
            </a>
          </td>
          <Modal
            bodyStyle={{backgroundColor:"#E8E3C7"}}
            title={"Equipment Id: " + repairLog.equipment_id}
            visible={this.state.visibleFour}
            onOk={() => {
              this.setState({
                visibleThree: true,
                visibleFour: false,
              });
            }}
            onCancel={() => {
              this.setState({
                visibleThree: true,
                visibleFour: false,
              });
            }}
            width={700}
          >
            <div class="container">
              <p style={{fontSize:"17px"}}>
                <strong>Problem:</strong> {repairLog.problem}
              </p>
              <p style={{fontSize:"17px"}}>
                <strong>Corrective Action:</strong> {repairLog.correctiveAction}
              </p>
              <p style={{fontSize:"17px"}}>
                <strong>Mechanic Id:</strong> {repairLog.mechanic_id}
              </p>
            </div>
          </Modal>
        </tr>
      );
    });

    let data = this.state.equipments.map((equipment) => {
      if (user_id != equipment.mechanic_id) {
        return (
          <tr key={equipment._id}>
            <td style={{ textAlign: "center" }}>{equipment.equipment_id}</td>
            <td style={{ textAlign: "center" }}>
              {new Date(equipment.maintenanceCompleteDate).toLocaleDateString()}
            </td>
            <td
              style={{
                textAlign: "center",
                backgroundColor: statusColor[equipment.isDelayed],
              }}
            >
              <strong>{equipment.isDelayed ? "Delayed" : "Pending"}</strong>
            </td>
            <td style={{ textAlign: "center" }}>{equipment.mechanic_id}</td>
            <td style={{ textAlign: "center" }}>
              <a
                type="primary"
                style={{color:"#0779E4"}}
                onClick={() => {
                  Axios.get(backend_url + "/equipment/", {
                    params: { equipment_id: equipment.equipment_id },
                  }).then((result) => {
                    this.setState({
                      visibleOne: true,
                      equipmentDetails: result.data.result,
                    });
                  });
                }}
              >
                More Details
              </a>
            </td>
            <td style={{ textAlign: "center" }}>
              <a
                style={{color:"#0779E4"}}
                type="primary"
                onClick={() => {
                  Axios.get(backend_url + "/repair/", {
                    params: { maintenance_id: equipment._id },
                  }).then((result) => {
                    this.setState({
                      visibleThree: true,
                      repairLogs: result.data.result,
                    });
                  });
                }}
              >
                View Repair Logs
              </a>
            </td>
            <td style={{ textAlign: "center" }}>
              <Button
                style={{backgroundColor:"#839B97", color:"white", borderRadius:"20px", borderColor:"#839B97"}}
                onClick={() => {
                  this.setState({
                    visibleTwo: true,
                  });
                }}
              >
                Review Maintenance
              </Button>
              <Modal
                bodyStyle={{backgroundColor:"#E8E3C7"}}
                title="REVIEW MAINTENANCE"
                visible={this.state.visibleTwo}
                onOk={() => {
                  this.setState({
                    visibleTwo: false,
                  });
                }}
                onCancel={() => {
                  this.setState({
                    visibleTwo: false,
                  });
                }}
                width={500}
              >
                <form>
                  <div class="form-group">
                    <label for="problem" style={{fontSize:"17px"}}><strong>Review Remarks</strong></label>
                    <textarea
                      class="form-control"
                      id="reviewRemarks"
                      name="reviewRemarks"
                      aria-describedby="emailHelp"
                      placeholder="Enter review remarks"
                      onChange={this.onChange}
                      style={{borderRadius:"10px"}}
                    />
                  </div>

                  <div class="form-group">
                    <label for="reviewOk" style={{fontSize:"17px"}}><strong>Is review ok ?</strong></label>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="reviewOk"
                        id="reviewOk"
                        value="true"
                        onChange={this.onChange}
                        style={{borderRadius:"10px"}}
                      />
                      <label class="form-check-label" for="reviewOk" style={{fontSize:"17px"}}>
                        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Review Okay</strong>
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="reviewOk"
                        id="reviewOk"
                        value="false"
                        onChange={this.onChange}
                        style={{borderRadius:"10px"}}
                      />
                      <label class="form-check-label" for="reviewNotOk" style={{fontSize:"17px"}}>
                      <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Review not okay</strong>
                      </label>
                    </div>
                  </div>

                  <button style={{backgroundColor:"#403121", color:"white", borderRadius:"20px", borderColor:"#403121", width:"90px"}}
                    type="submit"
                    class="btn btn-primary"
                    onClick={() => {
                      const data = {
                        maintenance_id: equipment._id,
                        reviewRemarks: this.state.reviewRemarks,
                        reviewOk: this.state.reviewOk,
                        reviewedBy: cookie.load("user_id"),
                      };
                      Axios.patch(backend_url + "/maintenance/review", {
                        data,
                      }).then((result) => {
                        if (
                          result.status === 200 &&
                          result.data.success === true
                        ) {
                          alert("Review submitted successfully");
                        } else {
                          alert("Review could not be submitted successfully");
                        }
                      });
                    }}
                  >
                    Submit
                  </button>
                </form>
              </Modal>
            </td>
          </tr>
        );
      }
    });

    return (
      <div>
        <Modal
          bodyStyle={{backgroundColor:"#E8E3C7"}}
          title={this.state.equipmentDetails.equipmentName}
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
          width={500}
        >
          <p>
            <strong>Equipment Id:</strong>{" "}
            {this.state.equipmentDetails.equipment_id}
          </p>
          <p>
            <strong>Serial No:</strong> {this.state.equipmentDetails.serialNo}
          </p>
          <p>
            <strong>Maintenance Frequency:</strong>{" "}
            {frequency[this.state.equipmentDetails.maintenanceFrequency]}
          </p>
          <p>
            <strong>Next due date:</strong>{" "}
            {new Date(this.state.equipmentDetails.dueDate).toLocaleDateString()}
          </p>
        </Modal>

        <Modal
          bodyStyle={{backgroundColor:"#E8E3C7"}}
          title="VIEW REPAIR LOGS"
          visible={this.state.visibleThree}
          onOk={() => {
            this.setState({
              visibleThree: false,
            });
          }}
          onCancel={() => {
            this.setState({
              visibleThree: false,
            });
          }}
          width={785}
        >
          <div class="container">
            <table class="table table-striped" style={{ width: "700px", marginRight:"2px" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Part</th>
                  <th style={{ textAlign: "center" }}>Severity</th>
                  <th style={{ textAlign: "center" }}>Reviewed Date</th>
                  <th style={{ textAlign: "center" }}>More Details</th>
                </tr>
              </thead>
              <tbody>{repairLogsData}</tbody>
            </table>
          </div>
        </Modal>

        <div class="container">
          <table class="table table-striped">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Equipment Id</th>
                <th style={{ textAlign: "center" }}>
                  Mtnc. Complete Date
                </th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Completed By</th>
                <th style={{ textAlign: "center" }}>Equipment Details</th>
                <th style={{ textAlign: "center" }}>Repair Log</th>
                <th style={{ textAlign: "center" }}>Review</th>
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ReviewMaintenance;
