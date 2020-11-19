import Axios from 'axios';
import React, { Component } from 'react';
import backend_url from '../../url/backend_url';
import frequency from '../../utility/frequencyConvert';
import AdminNavbar from '../navbar/navbar';
import { Modal, Button, Radio } from 'antd';
// import {Button as AntButton} from "antd-button-color";
// import { Button as ReactButton, ButtonGroup } from 'react-bootstrap';

import maintenanceSchedule from '../../backend/model/maintenance-schedule';


class Equipments extends Component {
    constructor() {
        super();
        this.state = {
            equipments: [],
            description: '',
            visible: false,
            equipment_id: '',
            equipmentName: '',
            serialNo: '',
            maintenanceFrequency: '',
            dueDate: '',
            maintenanceschedules: []
        }
    }

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        Axios.get(backend_url + '/equipment/all')
            .then(result => {
                this.setState({
                    equipments: result.data.result
                })
            })
    }

    render() {
        const mystyle = {
            paddingBottom: "10%",
            paddingLeft: "70%"
        };
        let mss = '';
        if (this.state.maintenanceschedules.length > 0) {
            mss = this.state.maintenanceschedules.map((ms) => {
                return (
                    <tr key={ms._id}>
                        <td style={{ textAlign: 'center' }}>{ms.mechanic_id}</td>
                        <td style={{ textAlign: 'center' }}>{ms.maintenanceCompleteDate ? ms.maintenanceCompleteDate : "In progress"}</td>
                        <td style={{ textAlign: 'center' }}>{ms.isLocked ? ms.mechanic_id + " is working" : "Not yet started"}</td>
                        <td style={{ textAlign: 'center' }}><Button>Review it</Button></td>
                        <td style={{ textAlign: 'center' }}><Button>Related Reports</Button></td>
                    </tr>
                )
            })
        }

        let data = this.state.equipments.map((equipment) => {
            return (
                <tr key={equipment.equipment_id}>
                    <td style={{ textAlign: 'center' }}>{equipment.equipment_id}</td>
                    <td style={{ textAlign: 'center' }}>{equipment.equipmentName}</td>
                    <td style={{ textAlign: 'center' }}>{equipment.serialNo}</td>
                    <td style={{ textAlign: 'center' }}>{frequency[equipment.maintenanceFrequency]}</td>
                    <td style={{ textAlign: 'center' }}>
                        <Button type="primary" onClick={() => {
                            Axios.get(backend_url + '/maintenance/', { params: { equipment_id: equipment.equipment_id } }).then(result => {
                                this.setState({
                                    visible: true,
                                    equipment_id: equipment.equipment_id,
                                    equipmentName: equipment.equipmentName,
                                    serialNo: equipment.serialNo,
                                    maintenanceFrequency: equipment.maintenanceFrequency,
                                    dueDate: equipment.dueDate,
                                    maintenanceschedules: result.data.result
                                })
                            })
                        }}>
                            View
                        </Button>
                    </td>
                </tr>
            )
        })

        return (
            <div>
                {/* <AdminNavbar /> */}
                <>
                    <Modal
                        title={this.state.equipmentName}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        width={1000}>
                        <p><strong>Equipment Id:</strong> {this.state.equipment_id}</p>
                        <p><strong>Serial No:</strong> {this.state.serialNo}</p>
                        <p><strong>Maintenance Frequency:</strong> {frequency[this.state.maintenanceFrequency]}</p>
                        <p><strong>Next due date:</strong> {new Date(this.state.dueDate).toLocaleDateString()}</p>
                        <p>History of maintenance schedules:</p>
                        <div class="container" style={{ width: "800px" }}>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Mechanic Id</th>
                                        <th style={{ textAlign: 'center' }}>Complete Date</th>
                                        <th style={{ textAlign: 'center' }}>In Progress?</th>
                                        <th style={{ textAlign: 'center' }}>Review</th>
                                        <th style={{ textAlign: 'center' }}>View Repairs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mss}
                                </tbody>
                            </table>
                        </div>
                    </Modal>
                </>
                <div class="container">
                    
                    <div style={{ mystyle }}>


                        <Radio.Group defaultValue="a" buttonStyle="solid" Button type="warning">
                            <Radio.Button  value="a">Today</Radio.Button>
                            <Radio.Button value="b">This Week</Radio.Button>
                            <Radio.Button value="c">This Month</Radio.Button>
                           
                        </Radio.Group>
                        



                    </div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center' }}>Equipment Id</th>
                                <th style={{ textAlign: 'center' }}>Equipment Name</th>
                                <th style={{ textAlign: 'center' }}>Serial Number</th>
                                <th style={{ textAlign: 'center' }}>Maintenance Frequency</th>
                                <th style={{ textAlign: 'center' }}>Maintenance Schedule</th>
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

export default Equipments;