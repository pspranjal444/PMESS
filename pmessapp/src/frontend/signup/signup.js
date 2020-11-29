import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import axios from 'axios';
import backend_url from '../../url/backend_url';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            user_id: '',
            password: '',
            phone: '',
            email_id: '',
            role: ''

        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClick = () => {
        const { firstName, lastName, user_id, password, phone, email_id, role} = this.state;
        axios.post(backend_url + '/user', { firstName, lastName, user_id, password, phone, email_id, role })
            .then(result => {
                if (result.data.success && result.status == 200) {
                    alert('User successfully created');
                } else {
                    alert('User could not be created successfully');
                }
            })
    }

    render() {
        return (
            <div style={{ paddingLeft: "20%" }}>
                 <Helmet>
          <style>{"body{background-color: #EEEEEE;}"}</style>
        </Helmet>  
        
        <div class="container">
         <img src="admin.png" style={{height:"50px", width:"50px", marginLeft:"870px", marginTop:"10px"}}/> <strong>Susan Doe (Administrator)</strong>
        </div>  
                <div class="panel panel-default" style={{ borderRadius:"30px", padding: "40px" , marginLeft:"320px", marginTop:"80px", width:"450px", backgroundColor:"#B9CEEB"}}>
                    <h2 style={{textAlign:"center" , color: "#393E46", fontSize:"36px"}}>Add New User</h2>
                    <br />
                    <img src="add-male-user.png" style={{height:"150px", width:"150px", marginLeft:"100px"}}/>
                    <form>
                        <div class="form-group">
                            <label for="firstName" style={{fontSize:"17px", color: "#393E46"}}>First Name: </label>
                            <input type="text" class="form-control" id="firstName" name="firstName" placeholder="e.g., Mary" style={{borderRadius:"20px"}} onChange={this.onChange} />
                        </div>

                        <div class="form-group">
                            <label for="lastName" style={{fontSize:"17px", color: "#393E46"}}>Last Name: </label>
                            <input type="text" class="form-control" id="lastName" name="lastName" placeholder="e.g., Parker" style={{borderRadius:"20px"}} onChange={this.onChange} />
                        </div>
                        <div class="form-group">
                            <label for="user_id" style={{fontSize:"17px", color: "#393E46"}}>Employee Id:</label>
                            <input type="text" class="form-control" id="user_id" name="user_id" placeholder="e.g., 6344202987" style={{borderRadius:"20px"}} onChange={this.onChange} />
                        </div>

                        <div class="form-group">
                            <label for="phone" style={{fontSize:"17px", color: "#393E46"}}>Contact Number:</label>
                            <input type="text" class="form-control" id="phone" name="phone" placeholder="e.g., +1-(xxx)-(xxx)-(xxxx)" style={{borderRadius:"20px"}} onChange={this.onChange} />
                        </div>


                        <div class="form-group">
                            <label for="email" style={{fontSize:"17px", color: "#393E46"}}>Email ID: </label>
                            <input type="text" class="form-control" id="email_id" name="email_id" aria-describedby="emailHelp" placeholder="e.g., abc345@s-vlabs.com" style={{borderRadius:"20px"}}  onChange={this.onChange} />
                        </div>

                        <div class="form-group">
                            <label for="password" style={{fontSize:"17px", color: "#393E46"}}>Password:</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="e.g., *********" style={{borderRadius:"20px"}} onChange={this.onChange} />
                        </div>
                        
                        
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="role" id="role" value="A" onChange={this.onChange} />
                            <label class="form-check-label" style={{fontSize:"17px", color: "#393E46"}} for="typeAdmin">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Administrator
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="role" id="role" value="M" onChange={this.onChange} />
                            <label class="form-check-label" style={{fontSize:"17px", color: "#393E46"}} for="typeMechanic">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mechanic
                            </label>
                        </div>
                        <br/>
                        <br/>
                        <button type="submit" class="btn btn-primary" style={{backgroundColor:"#34699A", color:"white", borderRadius:"20px", borderColor:"#34699A",fontSize:"17px", marginLeft:"130px"}} onClick={this.onClick}>Create User</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;