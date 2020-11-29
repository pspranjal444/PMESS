import React, { Component } from 'react';
import {
    Button,
    Form,
    Input
} from 'semantic-ui-react';
import { Table, ToggleButton, ToggleButtonGroup, Form as BForm, Modal } from "react-bootstrap";
import Axios from "axios";
import backend_url from "../../../url/backend_url";




class pmSchedules extends Component {


    //handleChange = (e, { value }) => this.setState({ value })
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            dateFilter: "",
            userID: "",
            toggleCustomDate: false,
            startDate: "",
            endDate: "",
            taskFilter: "",
            completionType: ""

        };
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleCompletionType = this.handleCompletionType.bind(this);
        this.handleTaskFilter = this.handleTaskFilter.bind(this);
        this.submitForm = this.submitForm.bind(this);
        
        this.handleDateToggle = this.handleDateToggle.bind(this);
        this.handleChangeGeneric = this.handleChangeGeneric.bind(this);

    }

    handleDateToggle = e => {
        this.setState(prevState => ({
            toggleCustomDate: !prevState.toggleCustomDate
        }));
    }
    submitForm = e => {

        e.preventDefault();

        let start = new Date();
        let end = new Date();

        if (this.state.dateFilter == 'Today') {
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
            if (this.state.toggleCustomDate) {
                console.log('start', this.state);
                console.log('endDate', this.state.endDate);
                start = this.state.startDate;
                end = this.state.endDate;
            }
        }


        var query = {
            start: start,
            end: end,
            taskType: this.state.taskFilter,
            completionType: this.state.completionType
        }
        console.log("query    ",query);
        Axios.post(backend_url + '/report/pmreviewreport', { query })
            .then(res => {
                this.setState({ response: res.data.result })
                console.log(res.data.result);
            })
    }

    

    handleChangeGeneric = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleFilterChange = e => {
        //console.log('Filter', this.state.dateFilter);
        this.setState({
            dateFilter: e
        });
        console.log('Filter', this.state.dateFilter);
    }
    // customDate = ({value})

    handleTaskFilter = e => {
        //console.log('Filter', this.state.dateFilter);
        this.setState({
            taskFilter: e
        });
        //console.log('Filter', this.state.dateFilter);
    }
    handleCompletionType = e => {
        //console.log('Filter', this.state.dateFilter);
        this.setState({
            completionType: e
        });
        //console.log('Filter', this.state.dateFilter);
    }

    render() {
        const { value } = this.state
        var cT = this.state.completionType;
        return (
            <Form>

                <strong>Select Date Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                <ToggleButtonGroup type="radio" name="dateFilter" value={this.state.dateFilter} onChange={this.handleFilterChange}>
                    <ToggleButton value={'Today'} style={{backgroundColor:'#c1c0b9', borderColor:'#c1c0b9', color:"black"}}>Today</ToggleButton>
                    <ToggleButton value={'This Week'} style={{backgroundColor:'#c1c0b9', borderColor:'#c1c0b9', color:"black"}}>This Week</ToggleButton>
                    <ToggleButton value={'This Month'} style={{backgroundColor:'#c1c0b9', borderColor:'#c1c0b9', color:"black"}}>This Month</ToggleButton>
                    <ToggleButton value={'Custom Date'} onChange={this.handleDateToggle} style={{backgroundColor:'#c1c0b9', borderColor:'#c1c0b9', color:"black"}}>Custom Date</ToggleButton>
                    {this.state.toggleCustomDate &&
                        <>
                            <BForm.Group controlId="formBasicCollege">
                                <BForm.Label>Start Date</BForm.Label>
                                <BForm.Control onChange={this.handleChangeGeneric} name="startDate" type="Date" placeholder="Start Date" />
                            </BForm.Group>
                            <BForm.Group controlId="formBasicCollege">
                                <BForm.Label>End Date</BForm.Label>
                                <BForm.Control onChange={this.handleChangeGeneric} name="endDate" type="Date" placeholder="End Date" />
                            </BForm.Group>
                        </>
                    }

                </ToggleButtonGroup>
                
                <br/>
                <br />
                <strong>Select Task Type&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</strong>
                <ToggleButtonGroup type="radio" name="taskFilter" value={this.state.taskFilter} onChange={this.handleTaskFilter} >
                    
                    <ToggleButton value={'PM'} style={{backgroundColor:'#c1c0b9', borderColor:'#c1c0b9', color:"black"}}>PM</ToggleButton>
                    <ToggleButton value={'Review'} style={{backgroundColor:'#c1c0b9', borderColor:'#c1c0b9', color:"black"}}>Review</ToggleButton>

                </ToggleButtonGroup>
               
                < br />
                <br />
                <strong>Select Completion Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                <ToggleButtonGroup type="radio" name="completionType" value={this.state.completionType} onChange={this.handleCompletionType}>
                    <ToggleButton value={'All'} style={{backgroundColor:'#c1c0b9', borderColor:'#c1c0b9', color:"black"}}>All</ToggleButton>
                    <ToggleButton value={'On Time'} style={{backgroundColor:'#c1c0b9', borderColor:'#c1c0b9', color:"black"}}>On Time</ToggleButton>
                    <ToggleButton value={'Delayed'} style={{backgroundColor:'#c1c0b9', borderColor:'#c1c0b9', color:"black"}}>Delayed</ToggleButton>
                </ToggleButtonGroup>

               
                <Form.Field control={Button} onClick={this.submitForm} style={{backgroundColor:"#595B83", borderRadius:"20px", borderColor:"#595B83", color:"white", width:"100px", fontSize:"15px"}}>Submit</Form.Field>
                {this.state.response != undefined &&
                    <Table striped bordered hover style={{width:"1000px", marginLeft:"40px", marginRight:"40px", textAlign:"center", fontSize:"16px", borderRadius:"20px"}}>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th>Equipment ID</th>
                                <th>Completed By</th>
                                <th>Completed Date</th>
                                {this.state.taskFilter == "Review" &&
                                    <th>Review Remarks</th>}
                                <th>Completed Status</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.response.map(function (eachRecord, index, cT) {
                                return(
                                    <tr> 
                                         
                                        <td>{eachRecord.equipment_id}</td>    
                                        {this.state.taskFilter == "PM"
                                        && 
                                        <>
                                        <td>{eachRecord.mechanic_id}</td>
                                        <td>{eachRecord.maintenanceCompleteDate}</td>
                                        <td>{eachRecord.isDelayed ? 'Delayed' : 'On Time' }</td>
                                        </>}
                                        {this.state.taskFilter == "Review"
                                        &&
                                        <> 
                                        <td>{eachRecord.reviewedBy}</td>
                                        <td>{eachRecord.reviewedDate}</td>
                                        <td>{eachRecord.reviewRemarks}</td>
                                        <td>{eachRecord.reviewDelayed ? 'Delayed' : 'On Time' }</td>
                                        </>}
                                        

                                    </tr>
                                )
                            },this)}
                                
                            
                        </tbody>
                    </Table>
                }
            </Form>
        )
    }
}

export default pmSchedules;