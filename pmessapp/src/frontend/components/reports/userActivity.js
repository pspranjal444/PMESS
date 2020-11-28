import React, { Component } from 'react';
import {
    Button,
    Form,
    Input
} from 'semantic-ui-react';
import {  Table, ToggleButton, ToggleButtonGroup, Form as BForm, Modal } from "react-bootstrap";
import Axios from "axios";
import {Helmet} from "react-helmet";
import backend_url from "../../../url/backend_url";
import TableFilter from 'react-table-filter';

//import



class UserActivity extends Component {
   

    //handleChange = (e, { value }) => this.setState({ value })
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            dateFilter: "",
            userID : "",
            toggleCustomDate:false,
            startDate:"",
            endDate:"",
            details:""
            // response:[]
        };
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleUserIDInput = this.handleUserIDInput.bind(this);
        this.handleDateToggle = this.handleDateToggle.bind(this);
        this.handleChangeGeneric = this.handleChangeGeneric.bind(this);

    }
    
    handleDateToggle = e =>{
        this.setState(prevState => ({
            toggleCustomDate: !prevState.toggleCustomDate
        }));
    }
    submitForm = e => {

        e.preventDefault();

        let start = new Date();
        let end = new Date();
       
        if(this.state.dateFilter == 'Today') {
            //start = new Date();
            //end = new Date();
        } else if (this.state.dateFilter == 'This Week') {
            var days = 7;
            start = new Date(start.getTime() - (days * 24 * 60 * 60 * 1000));
           // end = end.getDate();
        } else if (this.state.dateFilter == 'This Month') {
            
            var days = 30;
            start = new Date(start.getTime() - (days * 24 * 60 * 60 * 1000));
            //end =  end.getDate();
            console.log('start', start);
            console.log('end', end);
        } else {
           if(this.state.toggleCustomDate){
               console.log('start', this.state);
               console.log('endDate', this.state.endDate);
               start  = this.state.startDate;
               end  = this.state.endDate;
           }
        }
        

        var query = {
            mechanic_id : this.state.userID,
            start: start,
            end: end
        }
        Axios.post(backend_url + '/report/userActivity', { query })
            .then(res => {
                console.log("User Activity: ",res.data.result);
                this.setState({response:res.data.result})
                
            })
    }
     
    handleUserIDInput = e => {
        this.setState({
            userID : e.target.value
        });
    };

     handleChangeGeneric = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    handleFilterChange = e => {
        console.log('Filter', this.state.dateFilter);
        this.setState({
            dateFilter: e
        });
        console.log('Filter', this.state.dateFilter);
    }
    
    viewDetails = () =>{
        const types = ["PM","Repair","Reviews"]
        var i = 0;
        const data = this.state.response.map((type) => {
            console.log("type: ", type)             
                const mapOver = type[types[i]]
                const currType = types[i]
                i++
                console.log("mapOver: ", mapOver)
                return (mapOver.map((content) => {
                    
                        return(
                        <tr>
                            <td>{currType}</td>
                            {/* <td>Task ID</td> */}
                            <td>{content.equipment_id}</td>
                            {currType == "PM" &&
                                <td>{content.maintenanceCompleteDate}</td>  
                            }
                            {currType == "Repair" &&
                                <td>{content.reviewedDate}</td>    
                            }
                            {currType == "Reviews" &&
                                <td>{content.reviewedDate}</td>
                            }
                            
                        </tr>)
                   
                })
                )
        })
        this.setState({details:data},console.log("DETAILSSSS: ",this.state.details))
    }
   // customDate = ({value})

    render() {
        const { value } = this.state
        return (
     
            <Form>
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Input}
                        label='User ID'
                        placeholder='User ID'
                        onChange = {this.handleUserIDInput}
                        style={{width:"550px", borderRadius:"30px"}}
                    />
                </Form.Group>
                 
                    <ToggleButtonGroup type="radio" name="dateFilter" value={this.state.dateFilter} onChange={this.handleFilterChange} >
                        <ToggleButton value={'Today'} style={{backgroundColor:'#707070', borderColor:'#707070'}}>Today</ToggleButton>
                        <ToggleButton value={'This Week'} style={{backgroundColor:'#707070', borderColor:'#707070'}}>This Week</ToggleButton>
                        <ToggleButton value={'This Month'} style={{backgroundColor:'#707070', borderColor:'#707070'}}>This Month</ToggleButton>
                    <ToggleButton value={'Custom Date'} onChange={this.handleDateToggle} style={{backgroundColor:'#707070', borderColor:'#707070'}}>Custom Date</ToggleButton>
                        {this.state.toggleCustomDate && 
                            <>
                            <BForm.Group controlId="formBasicCollege">
                            <BForm.Label>Start Date</BForm.Label>
                            <BForm.Control onChange={this.handleChangeGeneric} name = "startDate" type="Date" placeholder="Start Date" />
                                </BForm.Group>
                                <BForm.Group controlId="formBasicCollege">
                                    <BForm.Label>End Date</BForm.Label>
                            <BForm.Control onChange={this.handleChangeGeneric} name="endDate" type="Date" placeholder="End Date" />
                                </BForm.Group>
                            </>
                        } 
                        
                    </ToggleButtonGroup>

                <br/><br/>
                <Form.Field control={Button} onClick ={this.submitForm} style={{backgroundColor:"#709078", borderRadius:"20px", borderColor:"#709078", color:"white", width:"100px", fontSize:"15px"}}> Submit</Form.Field>
                
                {this.state.response != undefined &&         
                    <Table style={{width:"1000px", marginLeft:"40px", marginRight:"40px", textAlign:"center", fontSize:"16px"}}>
                        <thead>
                            <tr>
                                <th style={{textAlign:"center", fontSize:"17px"}}><b>PM</b></th>
                                <th style={{textAlign:"center", fontSize:"17px"}}><b>Repair</b></th>
                                <th style={{textAlign:"center", fontSize:"17px"}}><b>Review</b></th>
                            </tr>
                        </thead>
                        <tbody style={{ border: "2px", borderRadius:"10px", backgroundColor:"#cfd3ce"}}>
                            <tr>
                                <td>{this.state.response[0].PM.length}</td>
                                <td>{this.state.response[1].Repair.length}</td>
                                <td>{this.state.response[2].Reviews.length}</td>    
                            </tr> 
                        </tbody>
                    </Table>
                 }
                 <Button onClick={this.viewDetails} style={{borderRadius:"20px", width:"140px", fontSize:"15px", height:"38px", backgroundColor:"#5C6E91", color:"white"}}>View Details</Button>
                    <Table striped bordered hover style={{width:"1000px", marginLeft:"40px", marginRight:"40px", textAlign:"center", fontSize:"16px",}}>               
                        <thead>
                            <tr>
                                <th>Task Type</th>
                                {/* <th>Task ID</th> */}
                                <th>Equipment ID</th>
                                <th>Completed On</th>                               
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.details}
                        </tbody>
                    
                    </Table>
                 
            </Form>
        )
    }
}

export default UserActivity;