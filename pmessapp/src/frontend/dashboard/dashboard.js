import React, { Component } from 'react';
import Equipments from '../equipment/viewequipments';
import AdminNavbar from '../navbar/navbar';

class Dashboard extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <AdminNavbar />
                <Equipments/>
            </div>
        )
    }
}

export default Dashboard;