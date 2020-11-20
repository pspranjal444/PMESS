import React, { Component } from 'react';
import Axios from 'axios';
import { Tabs, Radio } from 'antd';
import ViewEquipments from '../../equipment/viewequipments';
import ViewEquipmentsToday from '../../mechanic/viewequipments/viewlockequipmentstoday';
import ViewEquipmentsWeekly from '../../mechanic/viewequipments/viewlockequipmentsweekly';
import ViewEquipmentsMonthly from '../../mechanic/viewequipments/viewlockequipmentsmonthly';

const { TabPane } = Tabs;

class Home extends Component {
  state = { 
    size: "large", 
    tab: <ViewEquipmentsToday/>
  };

  onChange = e => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    const mystyle = {
      paddingBottom: "10%",
      paddingLeft: "70%"
    };
    return (
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
    );
  }
}
export default Home;