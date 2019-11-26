import React, { Component } from "react";
import { AutoComplete, Descriptions, Tabs, TabPane } from "antd";
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
    this.props.getWeathers();
  }

  onSearch = (value, nameOfCountries) => {
    if (!nameOfCountries.includes(value)) return;
    const searchObjIndex = nameOfCountries.indexOf(value);
    const country = this.props.countries[searchObjIndex];
    return this.setState({
      countryName: value,
      capital: country.capital,
      population: country.population,
      code: country.numericCode,
      translations: country.translations,
      coords: country.latlng
    });
  };

  makeArrfromObject(arr) {
    let keys = Object.keys(arr);
    let newarr = keys.map(key => `${key}: ${arr[key]}`);
    return this.makeArr(newarr);
  }

  makeArr(arr) {
    return arr.map(item => <li key={item}>{item}</li>);
  }

  render() {
    const { countries, weathers, ...otherProps } = this.props;
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
            {this.makeArrfromObject(translations)}
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
        onChange={value => this.onSearch(value, nameOfCountries)}
        filterOption={(inputValue, option) =>
          option.props.children
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    );
  }
}
