import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
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
import RepairTasks from '../../repairs/repairtasks';
import ViewEquipmentsOverdue from '../../mechanic/viewequipments/viewlockequipmentsoverdue';

import { Button as SButton, Card, Image } from "semantic-ui-react";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

class Home extends Component {
  state = {
    size: "large",
    tab: <ViewEquipmentsOverdue />,
    startDate: '',
    endDate: '',
    keyTab: '',
    cardOutput: []
  };

  // getEquipmentCount() {
  //   return Axios.get(backend_url + '/equipment/countDueToday');

  // }

  // getOverdueCount() {
  //   return Axios.get(backend_url + '/equipment/countOverdue');
  // }

  componentWillMount() {
    Axios.get(backend_url + "/cardDetails").then((result) => {
      console.log("card  ", result);
      this.setState({
        cardOutput: result.data.result,
      });
    });

    // Promise.all([this.getEquipmentCount(), this.getOverdueCount(), this.getRepairCount()]).then(result1 => {
    //   this.setState({
    //     equipmentCount: result1.data.result1,
    //   }).then(result => {
    //     this.setState({
    //       overdueCount: result.data.result,
    //     })
    //   }).then(result2 => this.setState({
    //     repairCount: result2.data.result2,
    //   }) )
    // })
  }

  onChange = (e) => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    const mystyle = {
      paddingBottom: "10%",
      paddingLeft: "70%",
    };
    const dateFormat = "MM/DD/YYYY";
    return (
      <div style={{ paddingLeft: "20%" }}>
        <Helmet>
          <style>{"body{background-color: aliceblue;}"}</style>
        </Helmet>

        <>
          <Card.Group style={{ paddingBottom: "2%", paddingTop: "2%" }}>
            <Card
              color="violet"
              style={{ marginLeft: "1%", marginRight: "5%" }}
            >
              <Card.Content>
                <Image floated="right" size="tiny" src="equipment-icon-4.jpg" />
                <Card.Header>Equipments Due</Card.Header>
                <Card.Meta></Card.Meta>
                <Card.Description>
                  <strong>{this.state.cardOutput[0]}</strong>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <SButton basic color="green">
                    Approve
                  </SButton>
                </div>
              </Card.Content>
            </Card>
            <Card color="teal" style={{ marginLeft: "1%", marginRight: "5%" }}>
              <Card.Content>
                <Image floated="right" size="tiny" src="timer.png" />
                <Card.Header>Overdue</Card.Header>
                <Card.Meta>New User</Card.Meta>
                <Card.Description>
                  <strong>{this.state.cardOutput[1]}</strong>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <SButton basic color="green">
                    Approve
                  </SButton>
                </div>
              </Card.Content>
            </Card>
            <Card color="pink" style={{ marginLeft: "1%", marginRight: "5%" }}>
              <Card.Content>
                <Image floated="right" size="tiny" src="repairlog.png" />
                <Card.Header>Repair Logs</Card.Header>
                <Card.Meta>New User</Card.Meta>
                <Card.Description>
                  <strong>{this.state.cardOutput[2]}</strong>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <SButton basic color="green">
                    Approve
                  </SButton>
                </div>
              </Card.Content>
            </Card>
          </Card.Group>
        </>

        {/* {redirectVar} */}
        <Tabs defaultActiveKey="1" type="card" size={this.state.size}>
          <TabPane tab="  Due Equipments " key="1">
            <div style={{ mystyle }}>
              <Radio.Group defaultValue="a" buttonStyle="solid" Button type="warning">
                <Radio.Button value="a" onChange={() => {
                  this.setState({
                    tab: <ViewEquipmentsOverdue />
                  })
                }}>Overdue</Radio.Button>
                <Radio.Button value="b" onChange={() => {
                  this.setState({
                    tab: <ViewEquipmentsToday />
                  })
                }}>Today</Radio.Button>
                <Radio.Button value="c" onChange={() => {
                  this.setState({
                    tab: <ViewEquipmentsWeekly />
                  })
                }}>This Week</Radio.Button>
                <Radio.Button value="d" onChange={() => {
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
                                        return Axios.patch(
                                          backend_url +
                                            "/equipment/updateduedate",
                                          { equipment }
                                        ).then((result) => {
                                          console.log(result);
                                          if (result.status == 200) {
                                            return Axios.patch(
                                              backend_url + "/equipment/unlock",
                                              { equipment }
                                            ).then((result) => {
                                              console.log(result);
                                              if (result.status == 200) {
                                                alert("Successfully Marked");
                                              }
                                            });
                                          }
                                        });
                                      }
                                    });
                                  });
                                }}
                              >
                                Complete
                              </Button>
                            </td>
                          </tr>
                        );
                      });
                      this.setState({
                        tab: (
                          <div class="container">
                            <table class="table table-striped">
                              <thead>
                                <tr>
                                  <th style={{ textAlign: "center" }}>
                                    Equipment Id
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Equipment Name
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Serial Number
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Maintenance Frequency
                                  </th>
                                  <th style={{ textAlign: "center" }}>
                                    Due Date
                                  </th>
                                  <th style={{ textAlign: "center" }}>Lock</th>
                                </tr>
                              </thead>
                              <tbody>{data}</tbody>
                            </table>
                          </div>
                        ),
                      });
                    });
                  }}
                >
                  Go
                </Button>
              </span>
            </div>
            {this.state.tab}
          </TabPane>
          <TabPane tab="Your Tasks" key="2">
            <LockedEquipments />
          </TabPane>
          <TabPane tab="Repair Tasks" key="3">
            <RepairTasks />
          </TabPane>
          <TabPane tab="Review Tasks" key="4">
            <ReviewMaintenance />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default Home;
