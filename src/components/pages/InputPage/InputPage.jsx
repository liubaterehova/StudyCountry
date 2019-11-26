import React, { Component } from "react";
import { AutoComplete } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

export default class InputPage extends Component {
  getCountriesName = countries => {
    return countries.map(country => country.name);
  };

  render() {
    const { countries, ...otherProps } = this.props;
    const nameOfCountries = this.getCountriesName(countries);
    return (
      <AutoComplete
        style={{ width: 200 }}
        dataSource={nameOfCountries}
        placeholder="write country"
        filterOption={(inputValue, option) =>
          option.props.children
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    );
  }
}
