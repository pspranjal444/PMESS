import Axios from 'axios';
import React, { Component, useState } from 'react';
import backend_url from '../../../url/backend_url';
import cookie from 'react-cookies';
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
            part: '',
            maintenance_id: '',
            equipment_id: '',
            repairLogs: [],
            severity:""
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
        const { maintenance_id, equipment_id, problem, part, severity } = this.state;
        console.log("On Click REPAIIIRRR: ",severity)
        const data = {
            maintenance_id: maintenance_id,
            equipment_id: equipment_id,
            problem: problem,
            part: part,
            severity: severity,
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
                        bodyStyle={{backgroundColor:"#E8E3C7"}}
                        title={"EQUIPMENT ID: " + repairLog.equipment_id}
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
                        width={700}>
                        <div class="container">
                            <p style={{fontSize:"16px"}}><strong>Problem:</strong> {repairLog.problem}</p>
                            <p style={{fontSize:"16px"}}><strong>Corrective Action:</strong> {repairLog.correctiveAction}</p>
                            <p style={{fontSize:"16px"}}><strong>Mechanic Id:</strong> {repairLog.mechanic_id}</p>
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
                        <a href="#" onClick={() => {
                            Axios.get(backend_url + '/equipment/', { params: { equipment_id: equipment.equipment_id } }).then(result => {
                                this.setState({
                                    visibleOne: true,
                                    equipmentDetails: result.data.result
                                })
                            })
                        }}>
                            More Details
                        </a>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <a href="#" onClick={() => {
                            this.setState({
                                visibleTwo: true,
                                maintenance_id: equipment._id,
                                equipment_id: equipment.equipment_id
                            })
                        }}>
                            Add Repair Log
                        </a>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <a href="#" onClick={() => {
                            Axios.get(backend_url + '/repair/', { params: { maintenance_id: equipment._id } }).then(result => {
                                this.setState({
                                    visibleThree: true,
                                    repairLogs: result.data.result
                                })
                            })
                        }}>
                            View Repair Logs
                        </a>
                    </td>
                    <td style={{textAlign: 'center'}}>
                    <Button style={{backgroundColor:"#839B97", color:"white", borderRadius:"20px", borderColor:"#839B97"}} onClick={()=>{
                            Axios
                                .get(backend_url + '/maintenance/locked', {params: {equipment_id: equipment.equipment_id}})
                                .then(result=>{
                                    console.log("get locked: ",result)
                                    const maintenance_id = result.data.result[0]._id;
                                    const eq_id = result.data.result[0].equipment_id;
                                    console.log("maintenainace ID: ",maintenance_id, "eq ID: ",eq_id)
                                    
                                    return Axios.patch(backend_url+'/maintenance/delayedpm', {maintenance_id, eq_id})
                                    .then(result =>{
                                        console.log("Delayed PM",result)
                                        if(result.status == 200){
                                            return Axios.patch(backend_url+'/maintenance/complete', {maintenance_id})
                                            .then(resultComplete=>{
                                                console.log(resultComplete)
                                                if(resultComplete.status == 200) {
                                                   return Axios.patch(backend_url+'/equipment/updateduedate', {equipment})
                                                   .then(result=>{
                                                       console.log(result)
                                                        if(result.status == 200) {
                                                            return Axios.patch(backend_url+'/equipment/unlock', {equipment})
                                                            .then(result=>{
                                                                console.log(result)
                                                                if(result.status == 200) {
                                                                    alert('Successfully Marked')
                                                                }
                                                            })
                                                        }   
                                                   }) 
                                                }
                                            })
                                        }
                                    })
                                    
                            })
                        }}>Complete</Button>
                    </td>
                </tr>
            )
        });

        return (
            <div>
                <Modal 
                    bodyStyle={{backgroundColor:"#E8E3C7"}}
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
                    <p style={{fontSize:"16px"}}><strong>Equipment Id:</strong> {this.state.equipmentDetails.equipment_id}</p>
                    <p style={{fontSize:"16px"}} ><strong>Serial No:</strong> {this.state.equipmentDetails.serialNo}</p>
                    <p style={{fontSize:"16px"}}><strong>Maintenance Frequency:</strong> {frequency[this.state.equipmentDetails.maintenanceFrequency]}</p>
                    <p style={{fontSize:"16px"}}><strong>Next due date:</strong> {new Date(this.state.equipmentDetails.dueDate).toLocaleDateString()}</p>
                </Modal>

                <Modal 
                    bodyStyle={{backgroundColor:"#E8E3C7"}}
                    title="ADD REPAIR LOG"
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
                            <label for="problem" style={{fontSize:"17px" }}><strong>Problem:</strong></label>
                            <textarea class="form-control" id="problem" name="problem" aria-describedby="emailHelp" onChange={this.onChange} style={{borderRadius:"15px"}} />
                        </div>
                        <div class="form-group">
                            <label for="part" style={{fontSize:"17px"}}><strong>Part:</strong></label>
                            <input type="text" class="form-control" id="part" name="part" aria-describedby="emailHelp" onChange={this.onChange} style={{borderRadius:"10px"}} />
                        </div>
                        <div class="form-group">
                            <label for="severity" style={{fontSize:"17px"}}><strong>Severity</strong></label>
                            <div class="form-check">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="severity"
                                id="severity"
                                value="L"
                                onChange={this.onChange}
                                style={{fontSize:"17px"}}
                            />
                            <label class="form-check-label" for="Low" style={{fontSize:"15px"}}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Low
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
                            <label class="form-check-label" for="Medium" style={{fontSize:"15px"}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Medium
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
                            <label class="form-check-label" for="Critical" style={{fontSize:"15px"}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Critical
                            </label>
                            </div>
                        </div>    
                        
                        <button type="submit" class="btn btn-primary" style={{backgroundColor:"#403121", color:"white", borderRadius:"20px", borderColor:"#403121", width:"90px"}} onClick={this.onClick}>Add</button>
                    </form>
                </Modal>

                <Modal
                    title="VIEW REPAIR LOGS"
                    bodyStyle={{backgroundColor:"#E8E3C7"}}
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
                    width={700}>
                    <div class="container">
                        <table class="table table-striped" style={{ width: "650px" }}>
                            <thead>
                                <tr>
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
                                <th style={{ textAlign: 'center' }}>Complete</th>
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