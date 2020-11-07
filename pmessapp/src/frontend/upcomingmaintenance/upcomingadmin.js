import React, { Component } from 'react';
import AdminNavbar from '../navbar/navbar';


class UpcomingAdmin extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <AdminNavbar />
                <div class="container">
                    <ul class="nav nav-tabs">
                        <li name="week" id="week"><a href="/weeklyadmin">Upcoming Week</a></li>
                        <li name="month" id="month"><a href="/monthlyadmin">Upcoming Month</a></li>
                        <li name="year" id="year"><a href="/annuallyadmin">Upcoming Year</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default UpcomingAdmin;