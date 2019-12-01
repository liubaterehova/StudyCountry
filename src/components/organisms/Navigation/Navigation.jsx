import React, { Component } from "react";
import { Tabs, Button } from "antd";
import InputCountry from "../InputCountry";
const { TabPane } = Tabs;

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.newTabIndex = 2;
    const panes = [
      {
        title: "Tab 1",
        content: (
          <InputCountry
            id="0"
            listCountries={this.props.tabs["0"].listCountries}
            isCountriesLoading={this.props.tabs["0"].isCountriesLoading}
            getCountries={this.props.getCountries}
            addNewTabInfo={this.props.addNewTabInfo}
          />
        ),
        key: "1"
      }
    ];

    this.state = {
      activeKey: panes[0].key,
      panes
    };
  }

  onChange = activeKey => {
    this.setState({ activeKey });
    console.log("new tab");
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({
      title: `Tab${this.newTabIndex}`,
      content: <InputCountry id={this.newTabIndex - 1} />,
      key: activeKey
    });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });

    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  render() {
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button onClick={this.add}>ADD</Button>
        </div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key}>
              {pane.content}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
