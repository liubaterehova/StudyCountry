import React, { Component } from "react";
import { Descriptions } from "antd";
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

  makeArrfromObject = arr => {
    const keys = Object.keys(arr);
    const newarr = keys.map(key => `${key}: ${arr[key]}`);
    return this.makeArr(newarr);
  };

  makeArr = arr => {
    return arr.map(item => <li key={item}>{item}</li>);
  };

  render() {
    const {
      name = "",
      capital = "",
      alpha2Code = "",
      latlng = "",
      translations = [],
      population = null,
      weathers = [],
      holidays = []
    } = this.props.country;
    console.log("this.propsinDescription", this.props);
    return (
      <Descriptions title="Country Info">
        <Descriptions.Item label="Country">{name}</Descriptions.Item>
        <Descriptions.Item label="Capital">{capital}</Descriptions.Item>
        <Descriptions.Item label="Weather">
          {this.makeDayWeather(weathers)}
        </Descriptions.Item>
        <Descriptions.Item label="Translations">
          {this.makeArrfromObject(translations)}
        </Descriptions.Item>
        <Descriptions.Item label="Code">{alpha2Code}</Descriptions.Item>
        <Descriptions.Item label="Holidays">
          {this.makeArr(holidays)}
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
