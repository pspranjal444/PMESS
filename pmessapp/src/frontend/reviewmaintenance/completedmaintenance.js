import { Result } from 'antd';
import Axios from 'axios';
import React, {Component} from 'react';
import backend_url from '../../url/backend_url';
import AdminNavbar from '../navbar/navbar';

class CompleteMaintenance extends Component {
    constructor() {
        this.state = {
            equipments: []
        }
    }

    componentDidMount() {
        Axios.get(backend_url+'/maintenance/all/complete').then(result=>{
            this.setState({
                equipments: result.data
            })
        })
    }

    render() {
        let data = this.state.equipments.map((equipment)=>{
            <tr key={equipment._id}>
                <td style={{ textAlign: 'center' }}>{equipment.equipment_id}</td>
                <td style={{ textAlign: 'center' }}>{equipment.maintenanceCompleteDate}</td>
                <td style={{ textAlign: 'center' }}>{equipment.reviewedBy}</td>
                <td style={{ textAlign: 'center' }}>{equipment.reviewedDate}</td>
            </tr>
        })
        return (
            <div>
                <AdminNavbar/>
                <div class="container">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center' }}>Equipment Id</th>
                                <th style={{ textAlign: 'center' }}>maintenance Complete Date</th>
                                <th style={{ textAlign: 'center' }}>Reviewed By</th>
                                <th style={{ textAlign: 'center' }}>Reviewed Date</th>
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

export default CompleteMaintenance;