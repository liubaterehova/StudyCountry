import React, { Component } from "react";
import { AutoComplete, Spin } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

export default class InputCountry extends Component {
  id = 0;
  state = {
    inputCountry: "",
    id: "",
    obj: null
  };

  componentDidUpdate(oldProps, oldState) {
    if (
      this.state.inputCountry === oldState.inputCountry &&
      this.props.listCountries === oldProps.listCountries
    ) {
      return;
    }
    this.selectCountry();
  }

  onChange = value => {
    this.props.getCountries({ value: value, id: this.props.id });
    this.setState({
      inputCountry: value
    });
  };

  selectCountry = () => {
    if (
      this.props.listCountries.length &&
      this.state.inputCountry.toLowerCase() ===
        this.props.listCountries[0].name.toLowerCase()
    ) {
      this.props.addNewTabInfo({
        country: this.props.listCountries[0],
        id: this.props.id
      });

      this.props.getWeathers({
        capital: this.props.listCountries[0].capital,
        id: this.props.id
      });

      this.props.getHolidays({
        country: this.props.listCountries[0].alpha2Code,
        id: this.props.id
      });
    }
  };

  makeDataSource = listCountries => {
    const res = listCountries
      .map(country => country.name.toLowerCase())
      .filter(item => {
        return item.includes(this.state.inputCountry.toLowerCase());
      });
    return res;
  };

  render() {
    const { listCountries, isCountriesLoading } = this.props;
    return (
      <div>
        <AutoComplete
          style={{ width: 200 }}
          dataSource={this.makeDataSource(listCountries)}
          onSearch={value => {
            return this.onChange(value);
          }}
          value={this.state.inputCountry}
          filterOption={(inputValue, option) =>
            option.props.children
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={value => {
            this.onChange(value);
          }}
        />
        {isCountriesLoading ? <Spin /> : null}
      </div>
    );
  }
}
