import React, { Component } from 'react';
import {
    Button,
    Form,
    Input
} from 'semantic-ui-react';
import {  Table, ToggleButton, ToggleButtonGroup, Form as BForm, Modal } from "react-bootstrap";
import Axios from "axios";
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
                    />
                </Form.Group>
                 
                    <ToggleButtonGroup type="radio" name="dateFilter" value={this.state.dateFilter} onChange={this.handleFilterChange}>
                        <ToggleButton value={'Today'}>Today</ToggleButton>
                        <ToggleButton value={'This Week'}>This Week</ToggleButton>
                        <ToggleButton value={'This Month'}>This Month</ToggleButton>
                    <ToggleButton value={'Custom Date'} onChange={this.handleDateToggle}>Custom Date</ToggleButton>
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

            
                <Form.Field control={Button} onClick ={this.submitForm}>Submit</Form.Field>
                {this.state.response != undefined &&         
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>PM</th>
                                <th>Repair</th>
                                <th>Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.response[0].PM.length}</td>
                                <td>{this.state.response[1].Repair.length}</td>
                                <td>{this.state.response[2].Reviews.length}</td>    
                            </tr> 
                        </tbody>
                    </Table>
                 }
                 <button onClick={this.viewDetails}>View Details</button>
                    <TableFilter rows={this.state.details}>               
                    {/* rows={this.state.details}         */}
                        <thead>
                            <tr>
                                <th filterkey="TaskType">Task Type</th>
                                {/* <th>Task ID</th> */}
                                <th filterkey="EquipmentID">Equipment ID</th>
                                <th filterkey="Completion">Completed On</th>                               
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.details}
                        </tbody>
                    </TableFilter>
                 
            </Form>
        )
    }
}

export default UserActivity;