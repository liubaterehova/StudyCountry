import React, { Component } from "react";
import { AutoComplete } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

export default class InputPage extends Component {
  state = {
    countryName: []
  };
  getCountriesName = countries => {
    return countries.map(country => country.name);
  };
  componentDidMount() {
    this.props.getCountries();
  }
  onSearch = (value, nameOfCountries) => {
    if (!nameOfCountries.includes(value)) return;
    return this.setState({
      countryName: value
    });
  };
  render() {
    const { countries, ...otherProps } = this.props;
    console.log("this.state", this.state);
    const nameOfCountries = this.getCountriesName(countries);
    return (
      <AutoComplete
        style={{ width: 200 }}
        dataSource={nameOfCountries}
        placeholder="write country"
        onSearch={value => this.onSearch(value, nameOfCountries)}
        filterOption={(inputValue, option) =>
          option.props.children
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    );
  }
}
