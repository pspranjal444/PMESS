import Axios from 'axios';
import React, { Component } from 'react';
import backend_url from '../../url/backend_url';
import frequency from '../../utility/frequencyConvert';
import AdminNavbar from '../navbar/navbar';
import { Modal, Button } from 'antd';


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
            dueDate: ''
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
        let data = this.state.equipments.map((equipment) => {
            return (
                <tr key={equipment.equipment_id}>
                    <td style={{ textAlign: 'center' }}>{equipment.equipment_id}</td>
                    <td style={{ textAlign: 'center' }}>{equipment.equipmentName}</td>
                    <td style={{ textAlign: 'center' }}>{equipment.serialNo}</td>
                    <td style={{ textAlign: 'center' }}>{frequency[equipment.maintenanceFrequency]}</td>
                    <td style={{ textAlign: 'center' }}>
                        <Button type="primary" onClick={() => {
                            this.setState({
                                visible: true,
                                equipment_id: equipment.equipment_id,
                                equipmentName: equipment.equipmentName,
                                serialNo: equipment.serialNo,
                                maintenanceFrequency: equipment.maintenanceFrequency,
                                dueDate: equipment.dueDate
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
                <AdminNavbar />
                <>
                    <Modal
                        title={this.state.equipmentName}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}>
                        <p><strong>Equipment Id:</strong> {this.state.equipment_id}</p>
                        <p><strong>Serial No:</strong> {this.state.serialNo}</p>
                        <p><strong>Maintenance Frequency:</strong> {frequency[this.state.maintenanceFrequency]}</p>
                        <p><strong>Next due date:</strong> {new Date(this.state.dueDate).toLocaleDateString()}</p>
                        <p>History of maintenance schedules:</p>
                    </Modal>
                </>
                <div class="container">
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