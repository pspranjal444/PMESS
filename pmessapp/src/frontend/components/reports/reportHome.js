import React, { Component } from 'react';

import { Tabs, Radio } from 'antd';

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import UserActivity from './userActivity';
import PMSchedules from './pmSchedules';
import pmSchedules from './pmSchedules';

const { TabPane } = Tabs;


class ReportHome extends Component {
    constructor(props) {

        super();
        this.state = {
            size: 'large',
            tab: <UserActivity />,
            cardOutput: [],
        };

    }

    render() {
     

        return (
            <div>
                <div style={{ paddingLeft: "20%" }}>
                    <Tabs defaultActiveKey="1" type="card" size={this.state.size}>
                        <TabPane tab="  User Activity " key="1">
                            
                            {this.state.tab}
                        </TabPane>
                        <TabPane tab="PM Schedules" key="2">
                           < PMSchedules />
                        </TabPane>
                        
                    </Tabs>
                </div>
               

               
            </div>
        )
    }
}

export default ReportHome;