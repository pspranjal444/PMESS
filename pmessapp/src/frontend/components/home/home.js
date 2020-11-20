import React, { Component } from 'react';
import Axios from 'axios';
import { Tabs, Radio } from 'antd';
import ViewEquipments from '../../equipment/viewequipments';

const { TabPane } = Tabs;

class Home extends Component {
  state = { size: "large" };

  onChange = e => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <div style={{paddingLeft: "20%"}}>
        
        
        <Tabs defaultActiveKey="1" type="card" size={size}>
          <TabPane tab="  Due Equipments " key="1">
            <ViewEquipments />
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