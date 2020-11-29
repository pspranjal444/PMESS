import React, { Component } from 'react';
import frequency from '../../utility/frequency';
import axios from 'axios';
import { Helmet } from "react-helmet";
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
            <div style={{paddingLeft: "20%"}}>
                 <Helmet>
          <style>{"body{background-color: #EEEEEE;}"}</style>
        </Helmet>  
        
        <div class="container">
         <img src="admin.png" style={{height:"50px", width:"50px", marginLeft:"870px", marginTop:"10px"}}/> <strong>Susan Doe (Administrator)</strong>
        </div> 
                <br /><br /><br /><br /><br />
                <div class="panel panel-default" style={{ borderRadius:"30px", padding: "40px" , marginLeft:"320px", marginTop:"10px", width:"450px", backgroundColor:"#DEECFC", border:"#DEECFC"}}>
                    <h2 style={{textAlign:"center" , color: "#393E46", fontSize:"30px"}}>Add New Equipment</h2>
                    <br />
                    <img src="xxx017-512.png" style={{height:"120px", width:"120px", marginLeft:"120px"}}/>
                    <form>
                        <div class="form-group">
                            <label for="equipment_id" style={{fontSize:"17px", color: "#393E46"}}>Equipment Id</label>
                            <input type="text" class="form-control" id="equipment_id" name="equipment_id" placeholder="e.g., FA10080" style={{borderRadius:"20px"}} onChange={this.onChange} />
                        </div>

                        <div class="form-group">
                            <label for="equipmentName" style={{fontSize:"17px", color: "#393E46"}}>Equipment Name</label>
                            <input type="text" class="form-control" id="equipmentName" name="equipmentName" placeholder="e.g., Shrink Wrappers" style={{borderRadius:"20px"}}  onChange={this.onChange} />
                        </div>

                        <div class="form-group">
                            <label for="serialNo" style={{fontSize:"17px", color: "#393E46"}}>Serial Number</label>
                            <input type="text" class="form-control" id="serialNo" name="serialNo" placeholder="e.g., AA10198BFG" style={{borderRadius:"20px"}}  onChange={this.onChange} />
                        </div>

                        <div class="form-group">
                            <label for="exampleInputPassword1" style={{fontSize:"17px", color: "#393E46"}} >Maintenance Frequency</label>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" style={{borderRadius:"20px"}} type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                                        document.getElementById("dropdownMenu2").innerHTML = "Monthly";
                                        this.setState({
                                            maintenanceFrequency: frequency.MONTHLY
                                        })
                                    }}>Monthly</button>
                                    <button class="dropdown-item" type="button" onClick={() => {
                                        document.getElementById("dropdownMenu2").innerHTML = "Annually";
                                        this.setState({
                                            maintenanceFrequency: frequency.ANNUALLY
                                        })
                                    }}>Anually</button>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <button type="submit" class="btn btn-primary" style={{backgroundColor:"#1B6CA8", color:"white", borderRadius:"20px", borderColor:"#1B6CA8",fontSize:"16px", marginLeft:"130px", width:"100px"}}  onClick={this.onClick}>Submit</button>
                        
                    
                    </form>
                </div>
            </div>
        );
    }
}

export default AddEquipment;