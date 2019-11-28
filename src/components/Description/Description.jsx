import React, { Component } from "react";
import { Descriptions } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

class Description extends Component {
  render() {
    const {
      name = "",
      capital = "",
      alpha2Code = "",
      latlng = "",
      translations = [],
      population = null
    } = this.props.country[0];
    console.log("this.propsinDescription", this.props);
    return (
      <Descriptions title="Country Info">
        <Descriptions.Item label="Country">{name}</Descriptions.Item>
        <Descriptions.Item label="Capital">{capital}</Descriptions.Item>
        {/* <Descriptions.Item label="Weather">
          {this.makeDayWeather(weathers)}
        </Descriptions.Item> */}
        {/* <Descriptions.Item label="Translations">
          {this.makeArrfromObject(translations)}
        </Descriptions.Item> */}
        <Descriptions.Item label="Code">{alpha2Code}</Descriptions.Item>
        {/* <Descriptions.Item label="Holidays">
            {this.makeArr(holidays)}
          </Descriptions.Item> */}
        <Descriptions.Item label="Population">{population}</Descriptions.Item>
        {/* <Descriptions.Item label="coords">
          {this.makeArr(latlng)}
        </Descriptions.Item> */}
      </Descriptions>
    );
  }
}
export default Description;
