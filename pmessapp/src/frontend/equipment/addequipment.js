import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import frequency from '../../utility/frequency';
import axios from 'axios';
import backend_url from '../../url/backend_url';

class AddEquipment extends Component {
    constructor() {
        super();
        this.state = {
            equipment_id: '',
            equipmentName: '',
            serialNo: '',
            maintenanceFrequency: 0
        }

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClick = (event) => {
        event.preventDefault();
        const data = {
            equipment_id: this.state.equipment_id,
            equipmentName: this.state.equipmentName,
            serialNo: this.state.serialNo,
            maintenanceFrequency: this.state.maintenanceFrequency
        }

        axios.post(backend_url+'/equipment/', {data})
            .then(res=>{
                
                if(res.data.success && res.status == 200) {
                    alert(res.data.message);
                } else {
                    alert('Equipment could not be added successfully');
                }
            })
    }

    render() {
        return (
            <div style={{paddingLeft: "30%"}}>
               
                <br /><br /><br /><br /><br />
                <div class="col-xs-5" style={{ border: "1px solid black", padding: "20px", marginLeft: "50px" }}>
                    <h2>Add Equipment</h2>
                    <form>
                        <div class="form-group">
                            <label for="equipment_id">Equipment Id</label>
                            <input type="text" class="form-control" id="equipment_id" name="equipment_id" placeholder="Enter equipment id" onChange={this.onChange} />
                        </div>

                        <div class="form-group">
                            <label for="equipmentName">Equipment Name</label>
                            <input type="text" class="form-control" id="equipmentName" name="equipmentName" placeholder="Equipment Name" onChange={this.onChange} />
                        </div>

                        <div class="form-group">
                            <label for="serialNo">Serial Number</label>
                            <input type="text" class="form-control" id="serialNo" name="serialNo" placeholder="Serial Number" onChange={this.onChange} />
                        </div>

                        <div class="form-group">
                            <label for="exampleInputPassword1">Maintenance Frequency</label>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Maintenance Frequency
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <button class="dropdown-item" type="button" onClick={() => {
                                        document.getElementById("dropdownMenu2").innerHTML = "Weekly";
                                        this.setState({
                                            maintenanceFrequency: frequency.WEEKLY
                                        })
                                    }}>Weekly</button>
                                    <button class="dropdown-item" type="button" onClick={() => {
                                        document.getElementById("dropdownMenu2").innerHTML = "Monthy";
                                        this.setState({
                                            maintenanceFrequency: frequency.MONTHLY
                                        })
                                    }}>Monthly</button>
                                    <button class="dropdown-item" type="button" onClick={() => {
                                        document.getElementById("dropdownMenu2").innerHTML = "Annually";
                                        this.setState({
                                            maintenanceFrequency: frequency.ANNUALLY
                                        })
                                    }}>Annually</button>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={this.onClick}>Submit</button>

                    </form>
                </div>
            </div>
        );
    }
}

export default AddEquipment;