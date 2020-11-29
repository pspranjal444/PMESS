import React, { Component } from "react";
import { Radio } from "antd";
import InProgress from "../inprogresstasks/inprogress";
import ThisWeek from "../inprogresstasks/thisweek";

class InProgressTasks extends Component {
  constructor() {
    super();
    this.state = {
      tab: <ThisWeek />,
    };
  }

  render() {
    const mystyle = {
      paddingBottom: "10%",
      paddingLeft: "70%",
    };
    return (
      <div>
        <div style={{ mystyle }}>
          <Radio.Group buttonStyle="solid" Button type="warning" style={{marginLeft: "30px"}}
            defaultValue="a"
            buttonStyle="solid"
            Button
            type="warning"
          >
            <Radio.Button
              style={{backgroundColor:"#0074E4", borderColor:"white", fontSize:"15px", textAlign:"center"}}
              value="a"
              onChange={() => {
                this.setState({
                  tab: <ThisWeek/>,
                });
              }}
            >
              This Week
            </Radio.Button>
            <Radio.Button
              style={{backgroundColor:"#0074E4", borderColor:"white", fontSize:"15px", textAlign:"center"}}
              value="b"
              onChange={() => {
                this.setState({
                  tab: <InProgress />,
                });
              }}
            >
              In Progress
            </Radio.Button>
          </Radio.Group>
          {this.state.tab}
        </div>
      </div>
    );
  }
}

export default InProgressTasks;
