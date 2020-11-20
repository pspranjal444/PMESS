import React, { Component } from 'react';
import Axios from 'axios';
import { Tabs, Radio, DatePicker, Button } from 'antd';
import ViewEquipments from '../../equipment/viewequipments';
import ViewEquipmentsToday from '../../mechanic/viewequipments/viewlockequipmentstoday';
import ViewEquipmentsWeekly from '../../mechanic/viewequipments/viewlockequipmentsweekly';
import ViewEquipmentsMonthly from '../../mechanic/viewequipments/viewlockequipmentsmonthly';
import ReviewMaintenance from '../../reviewmaintenance/reviewmaintenance';
import LockedEquipments from '../../mechanic/viewequipments/lockedequipments';
import backend_url from '../../../url/backend_url';
import frequency from '../../../utility/frequencyConvert';
import cookie from 'react-cookies';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

class Home extends Component {
  state = {
    size: "large",
    tab: <ViewEquipmentsToday />,
    startDate: '',
    endDate: ''
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
    const dateFormat = 'MM/DD/YYYY';
    return (
      <div style={{ paddingLeft: "20%" }}>
        <Tabs defaultActiveKey="1" type="card" size={this.state.size}>
          <TabPane tab="  Due Equipments " key="1">
            <div style={{ mystyle }}>
              <Radio.Group defaultValue="a" buttonStyle="solid" Button type="warning">
                <Radio.Button value="a" onChange={() => {
                  this.setState({
                    tab: <ViewEquipmentsToday />
                  })
                }}>Today</Radio.Button>
                <Radio.Button value="b" onChange={() => {
                  this.setState({
                    tab: <ViewEquipmentsWeekly />
                  })
                }}>This Week</Radio.Button>
                <Radio.Button value="c" onChange={() => {
                  this.setState({
                    tab: <ViewEquipmentsMonthly />
                  })
                }}>This Month</Radio.Button>
              </Radio.Group>
              <span style={{ marginLeft: "40px" }}>
                <RangePicker format={dateFormat} onChange={(dates, dateStrings) => {
                  this.setState({
                    startDate: dateStrings[0],
                    endDate: dateStrings[1]
                  })
                }} />&nbsp;&nbsp;
                <Button type="primary" onClick={() => {
                  Axios.get(backend_url + '/equipment/daterange', { params: { startDate: this.state.startDate, endDate: this.state.endDate } }).then(result => {
                    let equipments = result.data.result;
                    let data = equipments.map((equipment) => {
                      return (
                        <tr key={equipment.equipment_id}>
                          <td style={{ textAlign: 'center' }}>{equipment.equipment_id}</td>
                          <td style={{ textAlign: 'center' }}>{equipment.equipmentName}</td>
                          <td style={{ textAlign: 'center' }}>{equipment.serialNo}</td>
                          <td style={{ textAlign: 'center' }}>{frequency[equipment.maintenanceFrequency]}</td>
                          <td style={{ textAlign: 'center' }}>{new Date(equipment.dueDate).toLocaleDateString()}</td>
                          <td style={{ textAlign: 'center' }}>
                            <Button type="primary" disabled={equipment.isLocked} onClick={() => {
                              const mechanic_id = cookie.load('user_id');
                              const equipment_id = equipment.equipment_id;
                              Axios.post(backend_url + '/maintenance/lock', { equipment_id, mechanic_id }).then(result => {
                                alert(result.data.message);
                              })
                            }}>
                              Lock
                                  </Button>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <Button type="primary" disabled={!equipment.isLocked} onClick={() => {
                              Axios
                                .get(backend_url + '/maintenance/locked', { params: { equipment_id: equipment.equipment_id } })
                                .then(result => {
                                  console.log(result)
                                  const maintenance_id = result.data.result[0]._id;
                                  console.log(maintenance_id)
                                  return Axios.patch(backend_url + '/maintenance/complete', { maintenance_id })
                                    .then(resultComplete => {
                                      console.log(resultComplete)
                                      if (resultComplete.status == 200) {
                                        return Axios.patch(backend_url + '/equipment/updateduedate', { equipment })
                                          .then(result => {
                                            console.log(result)
                                            if (result.status == 200) {
                                              return Axios.patch(backend_url + '/equipment/unlock', { equipment })
                                                .then(result => {
                                                  console.log(result)
                                                  if (result.status == 200) {
                                                    alert('Successfully Marked')
                                                  }
                                                })
                                            }
                                          })
                                      }
                                    })
                                })
                            }}>Complete</Button>
                          </td>
                        </tr>
                      )
                    });
                    this.setState({
                      tab:
                        <div class="container"> 
                          <table class="table table-striped">
                            <thead>
                              <tr>
                                <th style={{ textAlign: 'center' }}>Equipment Id</th>
                                <th style={{ textAlign: 'center' }}>Equipment Name</th>
                                <th style={{ textAlign: 'center' }}>Serial Number</th>
                                <th style={{ textAlign: 'center' }}>Maintenance Frequency</th>
                                <th style={{ textAlign: 'center' }}>Due Date</th>
                                <th style={{ textAlign: 'center' }}>Lock</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data}
                            </tbody>
                          </table>
                        </div>
                    })
                  })
                }}>Go</Button>
              </span>
            </div>
            {this.state.tab}
          </TabPane>
          <TabPane tab="Repair Tasks" key="2">
            <LockedEquipments />
          </TabPane>
          <TabPane tab="Review Tasks" key="3">
            <ReviewMaintenance />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default Home;