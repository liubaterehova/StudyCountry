import React, { Component } from "react";
import { Tabs, Button } from "antd";
import TabPage from "../../pages/TabPage";
const { TabPane } = Tabs;

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.newTabIndex = 2;
    const panes = [{}];

    this.state = {
      activeKey: "0",
      panes
    };
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (id, action) => {
    this.props[action]({ id: +id });
  };

  render() {
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button onClick={this.props.add}>ADD</Button>
        </div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.props.tabs.map((tab, index) => (
            <TabPane tab={`Таб ${index}`} key={index}>
              <TabPage
                id={index}
                tabInfo={this.props.tabs[index]}
                getCountries={this.props.getCountries}
                addNewTabInfo={this.props.addNewTabInfo}
                getWeathers={this.props.getWeathers}
                getHolidays={this.props.getHolidays}
              />
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
