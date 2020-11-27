import Axios from "axios";
import React, { Component } from "react";
import backend_url from "../../url/backend_url";
import cookie from "react-cookies";
import { Button, Modal } from "antd";
import severity from "../mechanic/equipmentseverity";

class RepairTask extends Component {
  constructor() {
    super();
    this.state = {
      visibleOne: false,
      visibleTwo: false,
      repairs: [],
      severity: "",
      correctiveAction: "",
    };
  }

  componentDidMount() {
    Axios.get(backend_url + "/repair/all/incomplete").then((result) => {
      this.setState({
        repairs: result.data.result,
      });
    });
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const severityColor = {
      "L": "green",
      "M": "yellow",
      "C": "red"
    }
    let data = this.state.repairs.map((repairLog) => {
      return (
        <tr key={repairLog._id}>
          <td style={{ textAlign: "center" }}>{repairLog.equipment_id}</td>
          <td style={{ textAlign: "center" }}>{repairLog.part}</td>
          <td style={{ textAlign: "center" }}>{repairLog.filedBy}</td>
          <td style={{ textAlign: "center ", backgroundColor: severityColor[repairLog.severity]}}>{severity[repairLog.severity]}</td>
          <td style={{ textAlign: "center" }}>
            <a
              href="#"
              onClick={() => {
                this.setState({
                  visibleOne: true,
                });
              }}
            >
              More
            </a>
          </td>
          <td style={{ textAlign: "center" }}>
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  visibleTwo: true,
                });
              }}
            >
              Mark Complete
            </Button>
          </td>
          <Modal
            title={"Equipment Id: " + repairLog.equipment_id}
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
            <div class="container">
              <p>
                <strong>Problem:</strong> {repairLog.problem}
              </p>
              <p>
                <strong>Part:</strong> {repairLog.part}
              </p>
            </div>
          </Modal>

          <Modal
            title={"Equipment Id: " + repairLog.equipment_id}
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
                <label for="correctiveAction">Corrective Action</label>
                <textarea
                  class="form-control"
                  id="correctiveAction"
                  name="correctiveAction"
                  placeholder="Corrective Action taken"
                  onChange={this.onChange}
                />
              </div>

              {/* <div class="form-group">
                <label for="severity">Severity</label>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="severity"
                    id="severity"
                    value="L"
                    onChange={this.onChange}
                  />
                  <label class="form-check-label" for="Low">
                    Low
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="severity"
                    id="severity"
                    value="M"
                    onChange={this.onChange}
                  />
                  <label class="form-check-label" for="Medium">
                    Medium
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="severity"
                    id="severity"
                    value="C"
                    onChange={this.onChange}
                  />
                  <label class="form-check-label" for="Critical">
                    Critical
                  </label>
                </div>
              </div> */}

              <Button
                type="primary"
                onClick={() => {
                  const { severity, correctiveAction } = this.state;
                  const mechanic_id = cookie.load("user_id");
                  const _id = repairLog._id;
                  const data = {
                    _id: _id,
                    correctiveAction: correctiveAction,
                    severity: severity,
                    mechanic_id: mechanic_id,
                  };
                  Axios.patch(backend_url + "/repair/complete", { data }).then(
                    (result) => {
                      if (result.status == 200) {
                        alert("Successfully Submitted");
                      }
                    }
                  );
                }}
              >
                Submit
              </Button>
            </form>
          </Modal>
        </tr>
      );
    });
    return (
      <div class="container">
        <table class="table table-striped">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Equipment Id</th>
              <th style={{ textAlign: "center" }}>Part</th>
              <th style={{ textAlign: "center" }}>Created By</th>
              <th style={{ textAlign: "center" }}>Severity</th>
              <th style={{ textAlign: "center" }}>Details</th>
              <th style={{ textAlign: "center" }}>Complete</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
      </div>
    );
  }
}

export default RepairTask;
