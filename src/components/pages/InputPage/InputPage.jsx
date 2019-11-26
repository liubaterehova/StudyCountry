import React, { Component } from "react";
import { AutoComplete, Descriptions } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

export default class InputPage extends Component {
  state = {
    countryName: "",
    capital: "",
    weatherFor5Days: null,
    population: null,
    code: null,
    translations: [],
    coords: "",
    holidays: ""
  };

  getCountriesName = countries => {
    return countries.map(country => country.name);
  };

  componentDidMount() {
    this.props.getCountries();
  }

  onSearch = (value, nameOfCountries) => {
    if (!nameOfCountries.includes(value)) return;
    const searchObjIndex = nameOfCountries.indexOf(value);
    console.log("index", searchObjIndex);
    const country = this.props.countries[searchObjIndex];
    console.log(country);

    return this.setState({
      countryName: value,
      capital: country.capital,
      population: country.population,
      code: country.numericCode,
      translations: country.translations,
      coords: country.latlng
    });
  };

  makeBeautifulTranslate(arr) {
    let keys = Object.keys(arr);
    console.log("keys", keys);
    let newarr = keys.map(key => `${key}: ${arr[key]}`);
    console.log(newarr);
    return this.makeArr(newarr);
  }
  makeArr(arr) {
    return arr.map(item => <li>{item}</li>);
  }

  render() {
    const { countries, ...otherProps } = this.props;
    console.log("this.state", this.state);
    const nameOfCountries = this.getCountriesName(countries);
    if (this.state.countryName) {
      const {
        countryName,
        capital,
        weatherFor5Days,
        population,
        code,
        translations,
        coords,
        holidays
      } = this.state;

      return (
        <Descriptions title="Country Info">
          <Descriptions.Item label="Country">{countryName}</Descriptions.Item>
          <Descriptions.Item label="Capital">{capital}</Descriptions.Item>
          <Descriptions.Item label="Weather">
            {weatherFor5Days}
          </Descriptions.Item>
          <Descriptions.Item label="Translations">
            {this.makeBeautifulTranslate(translations)}
          </Descriptions.Item>
          <Descriptions.Item label="Code">{code}</Descriptions.Item>
          <Descriptions.Item label="Population">{population}</Descriptions.Item>
          <Descriptions.Item label="coords">
            {this.makeArr(coords)}
          </Descriptions.Item>
        </Descriptions>
      );
    }
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
