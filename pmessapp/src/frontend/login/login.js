import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import backend_url from '../../url/backend_url';
import cookie from 'react-cookies';
import './login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            user_id: '',
            password: '',
            role: ''
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClick = (event) => {
        event.preventDefault();
        const { user_id, password, role } = this.state;
        axios.get(backend_url + '/user', {params:{ user_id, password, role }})
            .then(result => {
                if (result.data.success && result.status == 200) {
                    cookie.save('user_id', user_id);
                    cookie.save('role', role);
                    window.location.href = '/home';
                } else {
                    alert('Unable to login. Please check the credentials');
                }
            })
            
    }

    render() {
        return (
            <div style={{ marginLeft: "500px", width: "20000px", marginTop: "10px"}}>
                 <Helmet>
          <style>{"body{background-color: #e0ece4;}"}</style>
        </Helmet>
                <img src="https://s-vlabs.com/wp-content/themes/mobilefirst/images/logo@2x.png"  style={{ marginLeft: "100px", height:"60px" }} />
                <br /><br/>
                <h2 style={{color: "#3b6978", marginLeft:"-90px", fontSize:"36px"}}>Equipment Preventive Maintenance System</h2><br/><br/>
               
                <div class="panel panel-default" style={{ borderRadius:"30px", padding: "40px" , marginLeft:"10px", width:"450px", backgroundColor:"#cedebd"}}>
                    <h2 style={{textAlign:"center" , color: "#393E46"}}>Member Login</h2>
                    <br />
                    <form>
                        <div class="form-group">
                            <i class="fa fa-user" aria-hidden="true" style={{height:"25px", width: "25px"}}></i>
                            <label for="email" style={{fontSize:"17px", color: "#393E46"}}>Username</label>
                            <input type="text" class="form-control" id="user_id" name="user_id" aria-describedby="emailHelp" style={{borderRadius:"20px"}} placeholder="Enter user id" onChange={this.onChange} />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>

                        <div class="form-group">
                            <i class="fa fa-key" aria-hidden="true" style={{height:"25px", width: "25px"}}></i>
                            <label for="password" style={{fontSize:"17px", color: "#393E46"}}>Password</label>
                            <input type="password" class="form-control" id="password" name="password" style={{borderRadius:"20px"}} placeholder="Enter password" onChange={this.onChange} />
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
                        </div><br/>

                        <button type="submit" class="btn btn-primary" style={{marginLeft:"150px", width:"90px", borderRadius:"20px", fontSize:"16px", backgroundColor:"#3b6978", borderColor:"#3b6978"}} onClick={this.onClick}>Login</button>
                    </form>
                </div>
                <div className="mover-1" style={{position: "absolute", bottom:"0px", marginLeft: "225px", marginBottom: "30px"}}><a href="/credits">Designed by Ankita Chikodi, Shravani Pande, Nehal Sharma, Pranjal Sharma</a></div>
            </div>
      
        );
    }
}

export default Login;