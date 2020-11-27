import React, { Component } from 'react';
import {
    Button,
    Form,
    Input
} from 'semantic-ui-react';
import {  Table, ToggleButton, ToggleButtonGroup, Form as BForm, Modal } from "react-bootstrap";
import Axios from "axios";
import backend_url from "../../../url/backend_url";
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
                this.setState({response:res.data.result})
                console.log(res.data.result);
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
                                <td>{this.state.response[0].PM}</td>
                                <td>{this.state.response[1].Repair}</td>
                                <td>{this.state.response[2].Reviews}</td>    
                            </tr> 
                        </tbody>
                    </Table>
                 }
            </Form>
        )
    }
}

export default UserActivity;