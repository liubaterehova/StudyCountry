import React, { Component } from "react";
import { AutoComplete } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

export default class InputPage extends Component {
  getCountriesName = countries => {
    return countries.map(country => country.name);
  };
  componentDidMount() {
    this.props.getCountries();
    console.log("arrayOfCountries", this.props.countries);
  }

  render() {
    const { countries, ...otherProps } = this.props;
    console.log("countriesInputPage", countries);
    console.log("this.props in InputPage", this.props);
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
