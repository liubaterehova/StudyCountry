import React, { Component } from "react";
import { AutoComplete, Descriptions, Spin } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Spinner from "../../spinner/";
import Description from "../../Description";
export default class InputPage extends Component {
  id = 0;
  state = {
    inputcountry: "",
    onChangeWorked: false,
    arrOfNames: [],
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
    return countries.map(country => country.name);
  };

  componentDidMount() {
    console.log("mount");
  }

  defineHolidays(country) {
    console.log("holidays");
  }

  onChange = value => {
    this.props.getCountries(value);
    this.setState({
      inputcountry: value,
      onChangeWorked: true
    });
  };

  makenewArr() {
    const arrOfObj = [];
    for (let obj of this.props.countries) {
      if (obj.name.includes(this.state.inputcountry)) {
        arrOfObj.push(obj);
      }
    }
    console.log("arrOfObj", arrOfObj);
    return arrOfObj;
  }
  putArrInProps(arrOfObj) {
    if (!arrOfObj.length) {
      this.props.cleanCountries();
      console.log("after clean", this.props.countries);
    } else if (arrOfObj.length === 1) {
      console.log("arrOfObj", arrOfObj[0]);
      console.log("id", this.id);
      arrOfObj[this.id].id = this.id;
      this.id++;
      console.log("arrOfObjWithId", arrOfObj[0]);
      this.props.changeArrOfCountries(arrOfObj);
      console.log("oneElementProps", this.props.countries);
    } else {
      this.props.changeArrOfCountries(arrOfObj);
      console.log("changesArr", this.props.countries);
    }
  }

  makeDayWeather(arr) {
    console.log("arr", arr);
    let newarr = arr.map(item => (
      <li key={item.id}>
        {item.applicable_date}: {Math.floor(item.the_temp)}°С
      </li>
    ));
    return newarr;
  }
  changeState() {
    console.log("passed, value", this.state.countryName);
    const arrOfObj = this.makenewArr();
    this.putArrInProps(arrOfObj);
    this.setState({ onChangeWorked: false });
  }

  makeArrfromObject(arr) {
    const keys = Object.keys(arr);
    const newarr = keys.map(key => `${key}: ${arr[key]}`);
    return this.makeArr(newarr);
  }

  makeArr(arr) {
    return arr.map(item => <li key={item}>{item}</li>);
  }

  makeDataSource(countries) {
    if (countries.length === undefined) return;
    const res = countries
      .map(country => country.name)
      .filter(item => item.includes(this.state.inputcountry));
    if (countries.length === 1) {
      console.log("countries[0]", countries[0]);
      return countries[0];
    }
    console.log("datasource", res);
    return res;
  }

  render() {
    const { countries, isLoading } = this.props;
    return isLoading ? (
      <Spin />
    ) : this.props.countries.length === 1 ? (
      <Description country={countries[this.props.id]}></Description>
    ) : (
      <div className="inputPage">
        <AutoComplete
          style={{ width: 200 }}
          dataSource={this.makeDataSource(countries)}
          placeholder="write country"
          onChange={value => this.onChange(value)}
          value={this.state.inputcountry}
          filterOption={(inputValue, option) =>
            option.props.children
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </div>
    );
  }
}
