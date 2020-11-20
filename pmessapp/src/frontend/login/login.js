import React, { Component } from 'react';
import axios from 'axios';
import backend_url from '../../url/backend_url';
import cookie from 'react-cookies';
import util from '../components/utility/getUserType';
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
                    //console.log(cookie.load('role'));
                    if (util.isAdmin()){
                        this.props.history.push('/home')
                    } else {
                        this.props.history.push('/viewequipmentsmechanic');
                    } 
                } else {
                    alert('Unable to login. Please check the credentials');
                }
            })
    }

    render() {
        return (
            <div style={{ marginLeft: "500px", width: "1300px", marginTop: "100px" }}>
                <img src="https://s-vlabs.com/wp-content/themes/mobilefirst/images/logo@2x.png" height="50px" style={{ marginLeft: "60px" }} />
                <br /><br />
                <div class="col-xs-3" style={{ border: "1px solid black", padding: "20px" }}>
                    <h2>Login</h2>
                    <br />
                    <form>
                        <div class="form-group">
                            <label for="email">User Id</label>
                            <input type="text" class="form-control" id="user_id" name="user_id" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.onChange} />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Password" onChange={this.onChange} />
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="role" id="role" value="A" onChange={this.onChange} />
                            <label class="form-check-label" for="typeAdmin">
                                Administrator
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="role" id="role" value="M" onChange={this.onChange} />
                            <label class="form-check-label" for="typeMechanic">
                                Mechanic
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={this.onClick}>Login</button>
                        &nbsp;&nbsp;<a href="/signup">Sign Up</a>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;