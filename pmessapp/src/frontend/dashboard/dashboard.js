import React, { Component } from 'react';
import Equipments from '../equipment/viewequipments';
import AdminNavbar from '../navbar/navbar';
import { Tabs, Radio } from 'antd';
import ViewEquipmentsWeekly from '../mechanic/viewequipments/viewlockequipmentsweekly';
import ViewEquipmentsMonthly from '../mechanic/viewequipments/viewlockequipmentsmonthly';
import ViewEquipmentsToday from '../mechanic/viewequipments/viewlockequipmentstoday';
import Sidebar from '../sidebar/sidebar';

const { TabPane } = Tabs;

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            size: 'large',
            tab: <ViewEquipmentsToday/>
        };
    }

    render() {
        const mystyle = {
            paddingBottom: "10%",
            paddingLeft: "70%"
        };
        
        return (
            <div>
                <div style={{ paddingLeft: "20%" }}>
                    <Tabs defaultActiveKey="1" type="card" size={this.state.size}>
                        <TabPane tab="  Due Equipments " key="1">
                            <div style={{ mystyle }}>
                                <Radio.Group defaultValue="a" buttonStyle="solid" Button type="warning">
                                <Radio.Button value="a" onChange={()=>{
                                        this.setState({
                                            tab: <ViewEquipmentsToday/>
                                        })
                                    }}>Today</Radio.Button>
                                    <Radio.Button value="b" onChange={()=>{
                                        this.setState({
                                            tab: <ViewEquipmentsWeekly/>
                                        })
                                    }}>This Week</Radio.Button>
                                    <Radio.Button value="c" onChange={()=>{
                                        this.setState({
                                            tab: <ViewEquipmentsMonthly/>
                                        })
                                    }}>This Month</Radio.Button>
                                </Radio.Group>
                            </div>
                            {this.state.tab}
                        </TabPane>
                        <TabPane tab="Repair Tasks" key="2">
                            Content of card tab 2
                        </TabPane>
                        <TabPane tab="Review Tasks" key="3">
                            Content of card tab 3
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default Dashboard;