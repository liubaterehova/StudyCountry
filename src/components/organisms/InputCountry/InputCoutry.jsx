import React, { Component } from "react";
import { AutoComplete, Spin } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Description from "../../organisms/Description";

export default class InputCountry extends Component {
  id = 0;
  state = {
    inputcountry: "",
    id: "",
    obj: null
  };

  componentDidUpdate(oldProps, oldState) {
    if (
      this.state.inputcountry === oldState.inputcountry &&
      this.props.listCountries === oldProps.listCountries
    ) {
      return;
    }
    this.selectCountry();
  }

  onChange = value => {
    this.props.getCountries(value);
    this.setState({
      inputcountry: value
    });
  };

  selectCountry = () => {
    if (
      this.props.listCountries.length &&
      this.state.inputcountry.toLowerCase() ===
        this.props.listCountries[0].name.toLowerCase()
    ) {
      this.props.changeArrOfSelectedCountries({
        country: this.props.listCountries[0],
        id: this.props.id
      });
    }
  };

  makeDataSource = listCountries => {
    const res = listCountries
      .map(country => country.name.toLowerCase())
      .filter(item => {
        return item.includes(this.state.inputcountry.toLowerCase());
      });
    console.log("datasource", res);
    return res;
  };

  render() {
    const { listCountries, isLoadingCountries, tabs } = this.props;
    return (
      <div>
        <AutoComplete
          style={{ width: 200 }}
          dataSource={this.makeDataSource(listCountries)}
          onSearch={value => {
            console.log("onsearch");
            return this.onChange(value);
          }}
          value={this.state.inputcountry}
          filterOption={(inputValue, option) =>
            option.props.children
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={value => {
            this.onChange(value);
            console.log("onSelect");
            console.log(this.props.tabs);
          }}
        />
        {isLoadingCountries ? (
          <Spin />
        ) : tabs[this.props.id] ? (
          <Description country={tabs[this.props.id]} id={this.props.id} />
        ) : null}
      </div>
    );
  }
}
