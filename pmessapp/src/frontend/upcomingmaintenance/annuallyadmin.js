import Axios from 'axios';
import  React, {Component} from 'react';
import backend_url from '../../url/backend_url';
import frequency from '../../utility/frequencyConvert';
import UpcomingAdmin from './upcomingadmin';

class AnnuallyAdmin extends Component {
    constructor() {
        super();
        
        this.state = {
            equipments: []
        }
    }

    componentDidMount() {
        Axios.get(backend_url+'/equipment/annually')
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
                        <input type="checkbox" class="form-check-input" id="needsReview" name="needsReview" defaultChecked={equipment.needsReview} onChange={() => {
                            Axios.patch(backend_url + '/equipment/needsreview', {equipment_id: equipment.equipment_id, needsReview: !equipment.needsReview})
                                .then(result => {
                                    console.log('Needs Review ?');
                                })
                        }} />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <input type="checkbox" class="form-check-input" id="isBackInUse" name="isBackInUse" defaultChecked={equipment.isBackInUse} onChange={()=>{
                            Axios.patch(backend_url + '/equipment/backinuse', {equipment_id: equipment.equipment_id, isBackInUse: !equipment.isBackInUse})
                            .then(result => {
                                console.log('Is Back in Use ?');
                            })
                        }} />
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <UpcomingAdmin/>
                <div class="container">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Equipment Id</th>
                            <th style={{ textAlign: 'center' }}>Equipment Name</th>
                            <th style={{ textAlign: 'center' }}>Serial Number</th>
                            <th style={{ textAlign: 'center' }}>Maintenance Frequency</th>
                            <th style={{ textAlign: 'center' }}>Needs Review?</th>
                            <th style={{ textAlign: 'center' }}>Is back in use?</th>
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

export default AnnuallyAdmin;