import React, { Component } from "react";
import { Descriptions, Spin } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

class Description extends Component {
  makeDayWeather = arr => {
    console.log("arr", arr);
    let newarr = arr.map(item => (
      <li key={item.id}>
        {item.applicable_date}: {Math.floor(item.the_temp)}°С
      </li>
    ));
    return newarr;
  };

  makeTranslationsList = arr => {
    const keys = Object.keys(arr);
    const newarr = keys.map(key => `${key}: ${arr[key]}`);
    return this.makeArr(newarr);
  };

  makeHolidaysList = holidays => {
    return holidays.map((holiday, index) => (
      <li key={index}>{holiday.name}</li>
    ));
  };

  makeArr = arr => {
    return arr.map(item => <li key={item}>{item}</li>);
  };

  render() {
    const {
      country,
      weathers,
      holidays,
      isWeathersLoading,
      isHolidaysLoading
    } = this.props;

    const {
      name = "",
      capital = "",
      alpha2Code = "",
      latlng = "",
      translations = [],
      population = null
    } = country;

    console.log("HOLIDAYSthis.propsinDescription", this.props.country);

    return (
      <Descriptions title="Country Info">
        <Descriptions.Item label="Country">{name}</Descriptions.Item>
        <Descriptions.Item label="Capital">{capital}</Descriptions.Item>
        <Descriptions.Item label="Weather">
          {isWeathersLoading ? <Spin /> : this.makeDayWeather(weathers)}
        </Descriptions.Item>
        <Descriptions.Item label="Translations">
          {this.makeTranslationsList(translations)}
        </Descriptions.Item>
        <Descriptions.Item label="Code">{alpha2Code}</Descriptions.Item>
        <Descriptions.Item label="Holidays">
          {isHolidaysLoading ? <Spin /> : this.makeHolidaysList(holidays)}
        </Descriptions.Item>
        <Descriptions.Item label="Population">{population}</Descriptions.Item>
        <Descriptions.Item label="coords">
          {this.makeArr(latlng)}
        </Descriptions.Item>
      </Descriptions>
    );
  }
}
export default Description;
