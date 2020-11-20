import Axios from 'axios';
import React, { Component, useState } from 'react';
import backend_url from '../../../url/backend_url';
import cookie from 'react-cookies';
import AdminNavbar from '../../navbar/navbar';
import frequency from '../../../utility/frequencyConvert';
import {
    Button,
    Modal
} from 'antd';
import severity from '../equipmentseverity';

class LockedEquipments extends Component {
    constructor() {
        super();

        this.state = {
            equipments: [],
            equipmentDetails: '',
            visibleOne: false,
            visibleTwo: false,
            visibleThree: false,
            visibleFour: false,
            problem: '',
            correctiveAction: '',
            part: '',
            severity: '',
            mechanicName: '',
            maintenance_id: '',
            equipment_id: '',
            repairLogs: []
        }

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        const mechanic_id = cookie.load('user_id')
        Axios.get(backend_url + '/maintenance/locked/mechanic', { params: { mechanic_id: mechanic_id } }).then(result => {
            this.setState({
                equipments: result.data.result
            })
        })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClick = () => {
        const { maintenance_id, equipment_id, problem, correctiveAction, part, severity, mechanicName } = this.state;
        const data = {
            maintenance_id: maintenance_id,
            equipment_id: equipment_id,
            problem: problem,
            correctiveAction: correctiveAction,
            part: part,
            severity: severity,
            mechanicName: mechanicName,
            mechanic_id: cookie.load('user_id')
        }
        Axios.post(backend_url + '/repair/', { data }).then(result => {
            if (result.status === 200) {
                alert('Repair Log added successfully');
            }
        })
    }

    render() {

        const severityColor = {
            "L": "green",
            "M": "yellow",
            "C": "red"
        }

        let repairLogsData = this.state.repairLogs.map((repairLog) => {
            return (
                <tr key={repairLog._id}>
                    <td style={{ textAlign: 'center' }}>{repairLog.maintenance_id}</td>
                    <td style={{ textAlign: 'center' }}>{repairLog.part}</td>
                    <td style={{ textAlign: 'center', backgroundColor: severityColor[repairLog.severity] }}><strong>{severity[repairLog.severity]}</strong></td>
                    <td style={{ textAlign: 'center' }}>{new Date(repairLog.reviewedDate).toLocaleDateString()}</td>
                    <td style={{ textAlign: 'center' }}><a href="#" onClick={() => {
                        this.setState({
                            visibleThree: false,
                            visibleFour: true
                        })
                    }}>More</a></td>
                    <Modal
                        title={"Equipment Id: " + repairLog.equipment_id}
                        visible={this.state.visibleFour}
                        onOk={() => {
                            this.setState({
                                visibleThree: true,
                                visibleFour: false
                            })
                        }}
                        onCancel={() => {
                            this.setState({
                                visibleThree: true,
                                visibleFour: false
                            })
                        }}
                        width={1000}>
                        <div class="container">
                            <p><strong>Problem:</strong> {repairLog.problem}</p>
                            <p><strong>Corrective Action:</strong> {repairLog.correctiveAction}</p>
                            <p><strong>Mechanic Id:</strong> {repairLog.mechanic_id}</p>
                            <p><strong>Mechanic Name:</strong> {repairLog.mechanicName}</p>
                        </div>
                    </Modal>
                </tr>
            )
        })

        let data = this.state.equipments.map((equipment) => {
            return (
                <tr key={equipment.equipment_id}>
                    <td style={{ textAlign: 'center' }}>{equipment.equipment_id}</td>
                    <td style={{ textAlign: 'center' }}>
                        <Button type="primary" onClick={() => {
                            Axios.get(backend_url + '/equipment/', { params: { equipment_id: equipment.equipment_id } }).then(result => {
                                this.setState({
                                    visibleOne: true,
                                    equipmentDetails: result.data.result
                                })
                            })
                        }}>
                            More Details
                        </Button>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <Button type="primary" onClick={() => {
                            this.setState({
                                visibleTwo: true,
                                maintenance_id: equipment._id,
                                equipment_id: equipment.equipment_id
                            })
                        }}>
                            Add Repair Log
                        </Button>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <Button type="primary" onClick={() => {
                            Axios.get(backend_url + '/repair/', { params: { maintenance_id: equipment._id } }).then(result => {
                                this.setState({
                                    visibleThree: true,
                                    repairLogs: result.data.result
                                })
                            })
                        }}>
                            View Repair Logs
                        </Button>
                    </td>
                </tr>
            )
        });

        return (
            <div>
                {/* <AdminNavbar /> */}
                <Modal
                    title={this.state.equipmentDetails.equipmentName}
                    visible={this.state.visibleOne}
                    onOk={() => {
                        this.setState({
                            visibleOne: false
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visibleOne: false
                        })
                    }}
                    width={500}>
                    <p><strong>Equipment Id:</strong> {this.state.equipmentDetails.equipment_id}</p>
                    <p><strong>Serial No:</strong> {this.state.equipmentDetails.serialNo}</p>
                    <p><strong>Maintenance Frequency:</strong> {frequency[this.state.equipmentDetails.maintenanceFrequency]}</p>
                    <p><strong>Next due date:</strong> {new Date(this.state.equipmentDetails.dueDate).toLocaleDateString()}</p>
                </Modal>

                <Modal
                    title="Add Repair Log"
                    visible={this.state.visibleTwo}
                    onOk={() => {
                        this.setState({
                            visibleTwo: false
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visibleTwo: false
                        })
                    }}
                    width={500}>
                    <form>
                        <div class="form-group">
                            <label for="problem">Problem</label>
                            <textarea class="form-control" id="problem" name="problem" aria-describedby="emailHelp" placeholder="Enter problem description" onChange={this.onChange} />
                        </div>

                        <div class="form-group">
                            <label for="correctiveAction">Corrective Action</label>
                            <textarea class="form-control" id="correctiveAction" name="correctiveAction" placeholder="Corrective Action taken" onChange={this.onChange} />
                        </div>

                        <div class="form-group">
                            <label for="part">Part</label>
                            <input type="text" class="form-control" id="part" name="part" aria-describedby="emailHelp" placeholder="Part" onChange={this.onChange} />
                        </div>
                        <div class="form-group">
                            <label for="severity">Severity</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="severity" id="severity" value="L" onChange={this.onChange} />
                                <label class="form-check-label" for="Low">
                                    Low
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="severity" id="severity" value="M" onChange={this.onChange} />
                                <label class="form-check-label" for="Medium">
                                    Medium
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="severity" id="severity" value="C" onChange={this.onChange} />
                                <label class="form-check-label" for="Critical">
                                    Critical
                                </label>
                            </div>
                            <div class="form-group">
                                <label for="mechanicName">Mechanic Name</label>
                                <input type="text" class="form-control" id="mechanicName" name="mechanicName" aria-describedby="emailHelp" placeholder="Mechanic Name" onChange={this.onChange} />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={this.onClick}>Add</button>
                    </form>
                </Modal>

                <Modal
                    title="View Repair Logs"
                    visible={this.state.visibleThree}
                    onOk={() => {
                        this.setState({
                            visibleThree: false
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visibleThree: false
                        })
                    }}
                    width={1000}>
                    <div class="container">
                        <table class="table table-striped" style={{ width: "910px" }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>Maintenance Id</th>
                                    <th style={{ textAlign: 'center' }}>Part</th>
                                    <th style={{ textAlign: 'center' }}>Severity</th>
                                    <th style={{ textAlign: 'center' }}>Reviewed Date</th>
                                    <th style={{ textAlign: 'center' }}>More Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {repairLogsData}
                            </tbody>
                        </table>
                    </div>
                </Modal>

                <div class="container">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center' }}>Equipment Id</th>
                                <th style={{ textAlign: 'center' }}>Equipment Details</th>
                                <th style={{ textAlign: 'center' }}>Repair Log</th>
                                <th style={{ textAlign: 'center' }}>View Repair Logs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default LockedEquipments;