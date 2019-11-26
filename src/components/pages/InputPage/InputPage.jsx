import React, { Component } from "react";
import { AutoComplete, Descriptions } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import makeApi from "../../../api";

export default class InputPage extends Component {
  state = {
    countryName: "",
    capital: "",
    weathers: [],
    population: null,
    code: null,
    translations: [],
    coords: "",
    alpha2Code: "",
    holidays: []
  };

  getCountriesName = countries => {
    console.log("countries", countries);
    return countries.map(country => country.name);
  };

  componentDidMount() {
    this.props.getCountries();
  }

  defineHolidays(country) {
    const custom = makeApi().custom;
    custom.getHolidays(country).then(result => {
      console.log("Holidays", result.data.holidays);
      const arrOfHolidays = result.data.holidays.map(item => item.name);
      this.setState({
        holidays: arrOfHolidays
      });
    });
  }

  onSearch = (value, nameOfCountries) => {
    if (!nameOfCountries.includes(value)) return;

    const searchObjIndex = nameOfCountries.indexOf(value);
    const country = this.props.countries[searchObjIndex];

    this.defineHolidays(country.alpha2Code);
    this.props.getWeathers(country.capital);

    this.setState({
      countryName: value,
      capital: country.capital,
      population: country.population,
      code: country.numericCode,
      translations: country.translations,
      coords: country.latlng,
      alpha2Code: country.alpha2Code
    });
  };

  makeDayWeather(arr) {
    console.log("arr", arr);
    let newarr = arr.map(item => (
      <li key={item.id}>
        {item.applicable_date}: {Math.floor(item.the_temp)}°С
      </li>
    ));
    console.log("newarr", newarr);
    return newarr;
  }

  makeArrfromObject(arr) {
    const keys = Object.keys(arr);
    const newarr = keys.map(key => `${key}: ${arr[key]}`);
    return this.makeArr(newarr);
  }

  makeArr(arr) {
    return arr.map(item => <li key={item}>{item}</li>);
  }

  render() {
    const { countries, weathers, ...otherProps } = this.props;
    const nameOfCountries = this.getCountriesName(countries);
    console.log("weathersProps", weathers);

    if (this.state.countryName) {
      const {
        countryName,
        capital,
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
            {this.makeDayWeather(weathers)}
          </Descriptions.Item>
          <Descriptions.Item label="Translations">
            {this.makeArrfromObject(translations)}
          </Descriptions.Item>
          <Descriptions.Item label="Code">{code}</Descriptions.Item>
          <Descriptions.Item label="Holidays">
            {this.makeArr(holidays)}
          </Descriptions.Item>
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
