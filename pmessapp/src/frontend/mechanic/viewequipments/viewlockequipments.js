import Axios from 'axios';
import React, { Component } from 'react';
import backend_url from '../../../url/backend_url';
import AdminNavbar from '../../navbar/navbar';
import { Button, Radio } from 'antd';
import frequency from '../../../utility/frequencyConvert';
import cookie from 'react-cookies';

class ViewLockEquipment extends Component {
    constructor() {
        super();

        this.state = {
            equipments: [],
            time: 'overdue'
        }
    }

    componentDidMount() {
        Axios.get(backend_url + '/equipment/' + this.state.time)
            .then(result => {
                this.setState({
                    equipments: result.data.result
                })
            });
    }



    render() {
        const mystyle = {
            paddingBottom: "10%",
            paddingLeft: "70%"
        };
        let data = this.state.equipments.map((equipment) => {
            return (
                <tr key={equipment.equipment_id}>
                    <td style={{ textAlign: 'center' }}>{equipment.equipment_id}</td>
                    <td style={{ textAlign: 'center' }}>{equipment.equipmentName}</td>
                    <td style={{ textAlign: 'center' }}>{equipment.serialNo}</td>
                    <td style={{ textAlign: 'center' }}>{frequency[equipment.maintenanceFrequency]}</td>
                    <td style={{ textAlign: 'center' }}>
                        <Button type="primary" disabled={equipment.isLocked} onClick={() => {
                            const mechanic_id = cookie.load('user_id');
                            const equipment_id = equipment.equipment_id;
                            Axios.post(backend_url + '/maintenance/lock', { equipment_id, mechanic_id }).then(result => {
                                alert(result.data.message);
                            })
                        }}>
                            Lock
                        </Button>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                {/* <AdminNavbar /> */}
                <a href="/lockedequipments">Work</a>
                <div class="container">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center' }}>Equipment Id</th>
                                <th style={{ textAlign: 'center' }}>Equipment Name</th>
                                <th style={{ textAlign: 'center' }}>Serial Number</th>
                                <th style={{ textAlign: 'center' }}>Maintenance Frequency</th>
                                <th style={{ textAlign: 'center' }}>Lock</th>
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

export default ViewLockEquipment;