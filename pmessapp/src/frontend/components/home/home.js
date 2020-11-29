import React, { Component, Fragment } from "react";
import { Helmet} from "react-helmet";
import Axios from "axios";
import { Tabs, Radio, DatePicker, Button } from "antd";
import ViewEquipmentsToday from "../../mechanic/viewequipments/viewlockequipmentstoday";
import ViewEquipmentsWeekly from "../../mechanic/viewequipments/viewlockequipmentsweekly";
import ViewEquipmentsMonthly from "../../mechanic/viewequipments/viewlockequipmentsmonthly";
import ReviewMaintenance from "../../reviewmaintenance/reviewmaintenance";
import LockedEquipments from "../../mechanic/viewequipments/lockedequipments";
import backend_url from "../../../url/backend_url";
import frequency from "../../../utility/frequencyConvert";
import cookie from "react-cookies";
import RepairTasks from "../../repairs/repairtasks";
import ViewEquipmentsOverdue from "../../mechanic/viewequipments/viewlockequipmentsoverdue";
import { Button as SButton, Card, Image } from "semantic-ui-react";
import InProgressTasks from "../../inprogresstasks/inprogresstasks";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

class Home extends Component {
  state = {
    size: "large",
    tab: <ViewEquipmentsOverdue />,
    startDate: "",
    endDate: "",
    keyTab: "",
    cardOutput: [],
  };

  componentWillMount() {
    Axios.get(backend_url + "/cardDetails").then((result) => {
      console.log("card  ", result);
      this.setState({
        cardOutput: result.data.result,
      });
    });

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
    const user_id = cookie.load("user_id");
    const role = cookie.load("role");
    return (
      <div style={{ paddingLeft: "20%" }}>
        {user_id && role == "A" && (
            <div>
            <Helmet>
            <style>{"body{background-color: #EEEEEE;}"}</style>
            </Helmet>  
            <div class="container">
            <img src="admin.png" style={{height:"50px", width:"50px", marginLeft:"870px", marginTop:"10px"}}/> <strong>Susan Doe (Administrator)</strong>
            </div> 
            <>
          <Card.Group style={{ paddingBottom: "2%", paddingTop: "2%", marginLeft:"40px", color:"white"}}>
            <Card
              color="violet"
              style={{ marginLeft: "1%", marginRight: "5%", backgroundColor:"#00BCD4"}}
            >
              <Card.Content>
                <Image floated="right" size="tiny" src="equipment-icon-4.jpg"/>
                <Card.Header style={{fontSize:"20px", marginTop:"20px", marginLeft:"15px"}}>Equipments Due</Card.Header>
                <Card.Meta></Card.Meta>
                <Card.Description style={{fontSize:"60px", marginLeft:"80px", marginTop:"-80px", marginBottom:"10px"}}>
                {this.state.cardOutput[0]}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button style={{backgroundColor:"whitesmoke", color:"black", fontSize:"16px", textAlign:"center", width:"250px", fontFamily:"sans-serif", borderRadius:"20px", marginLeft:"10px"}}>
                    View
                  </Button>
                </div>
              </Card.Content>
            </Card>
            <Card color="teal" style={{ marginLeft: "1%", marginRight: "5%", backgroundColor:"#FCBF1E" }}>
              <Card.Content>
                <Image floated="right" size="tiny" src="timer.png" />
                <Card.Header style={{fontSize:"20px", marginTop:"20px", marginLeft:"15px"}}>Overdue</Card.Header>
                <Card.Description style={{fontSize:"60px", marginLeft:"80px", marginTop:"-80px", marginBottom:"10px"}}>
                  {this.state.cardOutput[1]}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                <Button style={{backgroundColor:"whitesmoke", color:"black", fontSize:"16px", textAlign:"center", width:"250px", fontFamily:"sans-serif", borderRadius:"20px", marginLeft:"10px"}}>
                    View
                  </Button>
                </div>
              </Card.Content>
            </Card>
            <Card color="pink" style={{ marginLeft: "1%", marginRight: "5%", backgroundColor:"#F78259" }}>
              <Card.Content>
                <Image floated="right" size="tiny" src="repairlog.png" />
                <Card.Header style={{fontSize:"20px", marginTop:"20px", marginLeft:"15px"}}>Repair Logs</Card.Header>
                <Card.Description style={{fontSize:"60px", marginLeft:"80px", marginTop:"-80px", marginBottom:"10px"}}>
                  {this.state.cardOutput[2]}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                <Button style={{backgroundColor:"whitesmoke", color:"black", fontSize:"16px", textAlign:"center", width:"250px", fontFamily:"sans-serif", borderRadius:"20px", marginLeft:"10px"}}>
                    View
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Card.Group>
        </>
            </div>
          )}

          {user_id && role == "M" && (
            <div>
            <Helmet>
            <style>{"body{background-color: rgb(76, 175, 80, 0.2);}"}</style>
            </Helmet>  
            <div class="container">
            <img src="admin-settings-male.png" style={{height:"50px", width:"50px", marginLeft:"870px", marginTop:"10px"}}/> <strong>Stephen Parker (Mechanic)</strong>
            </div> 
            <>
            <Card.Group style={{ paddingBottom: "2%", paddingTop: "2%", marginLeft:"40px", color:"white"}}>
            <Card
              color="violet"
              style={{ marginLeft: "1%", marginRight: "5%", backgroundColor:"#00BCD4"}}
            >
              <Card.Content>
                <Image floated="right" size="tiny" src="equipment-icon-4.jpg"/>
                <Card.Header style={{fontSize:"20px", marginTop:"20px", marginLeft:"15px"}}>Equipments Due</Card.Header>
                <Card.Meta></Card.Meta>
                <Card.Description style={{fontSize:"60px", marginLeft:"80px", marginTop:"-80px", marginBottom:"10px"}}>
                {this.state.cardOutput[0]}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button style={{backgroundColor:"whitesmoke", color:"black", fontSize:"16px", textAlign:"center", width:"250px", fontFamily:"sans-serif", borderRadius:"20px", marginLeft:"10px"}}>
                    View
                  </Button>
                </div>
              </Card.Content>
            </Card>
            <Card color="teal" style={{ marginLeft: "1%", marginRight: "5%", backgroundColor:"#FCBF1E" }}>
              <Card.Content>
                <Image floated="right" size="tiny" src="timer.png" />
                <Card.Header style={{fontSize:"20px", marginTop:"20px", marginLeft:"15px"}}>Overdue</Card.Header>
                <Card.Description style={{fontSize:"60px", marginLeft:"80px", marginTop:"-80px", marginBottom:"10px"}}>
                  {this.state.cardOutput[1]}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                <Button style={{backgroundColor:"whitesmoke", color:"black", fontSize:"16px", textAlign:"center", width:"250px", fontFamily:"sans-serif", borderRadius:"20px", marginLeft:"10px"}}>
                    View
                  </Button>
                </div>
              </Card.Content>
            </Card>
            <Card color="pink" style={{ marginLeft: "1%", marginRight: "5%", backgroundColor:"#F78259" }}>
              <Card.Content>
                <Image floated="right" size="tiny" src="repairlog.png" />
                <Card.Header style={{fontSize:"20px", marginTop:"20px", marginLeft:"15px"}}>Repair Logs</Card.Header>
                <Card.Description style={{fontSize:"60px", marginLeft:"80px", marginTop:"-80px", marginBottom:"10px"}}>
                  {this.state.cardOutput[2]}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                <Button style={{backgroundColor:"whitesmoke", color:"black", fontSize:"16px", textAlign:"center", width:"250px", fontFamily:"sans-serif", borderRadius:"20px", marginLeft:"10px"}}>
                    View
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Card.Group>
        </>
            </div>
          )}
          
    
       
        {/* {redirectVar} */}
        <Tabs defaultActiveKey="1" type="card" size={this.state.size} style={{marginBottom:"30px", color:"black"}}>
          <TabPane tab="  Due Equipments " key="1">
            <div style={{ mystyle }}>
              <Radio.Group
                defaultValue="a"
                buttonStyle="solid"
                Button
                type="warning"
              >
                <Radio.Button style={{backgroundColor:'#0074E4', borderColor:'#0074E4', fontSize:"15px"}} 
                  value="a"
                  onChange={() => {
                    this.setState({
                      tab: <ViewEquipmentsOverdue />,
                    });
                  }}
                >
                  Overdue
                </Radio.Button>
                <Radio.Button style={{backgroundColor:'#0074E4', borderColor:'#0074E4', fontSize:"15px"}} 
                  value="b"
                  onChange={() => {
                    this.setState({
                      tab: <ViewEquipmentsToday />,
                    });
                  }}
                >
                  Today
                </Radio.Button>
                <Radio.Button style={{backgroundColor:'#0074E4', borderColor:'#0074E4', fontSize:"15px"}} 
                  value="c"
                  onChange={() => {
                    this.setState({
                      tab: <ViewEquipmentsWeekly />,
                    });
                  }}
                >
                  This Week
                </Radio.Button>
                <Radio.Button style={{backgroundColor:'#0074E4', borderColor:'#0074E4', fontSize:"15px"}} 
                  value="d"
                  onChange={() => {
                    this.setState({
                      tab: <ViewEquipmentsMonthly />,
                    });
                  }}
                >
                  This Month
                </Radio.Button>
              </Radio.Group>
              <span style={{ marginLeft: "40px" }}>
                <RangePicker
                  format={dateFormat}
                  onChange={(dates, dateStrings) => {
                    this.setState({
                      startDate: dateStrings[0],
                      endDate: dateStrings[1],
                    });
                  }}
                />
                &nbsp;&nbsp;

            
                <Button style={{backgroundColor:"#0074E4", borderRadius:"20px", borderColor:"#0074E4", color:"whitesmoke"}}
                  type="primary"
                  onClick={() => {
                    Axios.get(backend_url + "/equipment/daterange", {
                      params: {
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                      },
                    }).then((result) => {
                      let equipments = result.data.result;
                      let data = equipments.map((equipment) => {
                        return (
                          <tr key={equipment.equipment_id}>
                            <td style={{ textAlign: "center" }}>
                              {equipment.equipment_id}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {equipment.equipmentName}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {equipment.serialNo}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {frequency[equipment.maintenanceFrequency]}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {new Date(equipment.dueDate).toLocaleDateString()}
                            </td>
                            {cookie.load("user_id") &&
                              cookie.load("role") == "M" && (
                                <Fragment>
                                  <td style={{ textAlign: "center" }}>
                                    <Button
                                      buttonStyle={{backgroundColor:"#B6CDBD"}}
                                      disabled={equipment.isLocked}
                                      onClick={() => {
                                        const mechanic_id = cookie.load(
                                          "user_id"
                                        );
                                        const equipment_id =
                                          equipment.equipment_id;
                                        Axios.post(
                                          backend_url + "/maintenance/lock",
                                          { equipment_id, mechanic_id }
                                        ).then((result) => {
                                          alert(result.data.message);
                                        });
                                      }}
                                    >
                                    Lock
                                    </Button>
                                  </td>
                                </Fragment>
                              )}
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
                                  {cookie.load("user_id") &&
                                    cookie.load("role") == "M" && (
                                      <th style={{ textAlign: "center" }}>
                                        Lock
                                      </th>
                                    )}
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
          
          {user_id && role == "A" && (
            <Fragment>
              <TabPane tab="In progress tasks" key="2">
                <InProgressTasks/>
              </TabPane>
            </Fragment>
          )}

          {user_id && role == "M" && (
            <Fragment>
              <TabPane tab="Your Tasks" key="2">
                <LockedEquipments />
              </TabPane>
              <TabPane tab="Repair Tasks" key="3">
                <RepairTasks />
              </TabPane>
              <TabPane tab="Review Tasks" key="4">
                <ReviewMaintenance />
              </TabPane>
            </Fragment>
          )}
        </Tabs>
      </div>
    );
  }
}
export default Home;