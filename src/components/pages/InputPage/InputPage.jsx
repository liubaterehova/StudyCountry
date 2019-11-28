import React, { Component } from "react";
import { AutoComplete, Descriptions, Spin } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Spinner from "../../spinner/";
import Description from "../../Description";
export default class InputPage extends Component {
  id = 0;
  state = {
    inputcountry: "",
    weathers: [],
    holidays: [],
    id: ""
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
      inputcountry: value
    });
    const arrOfObj = this.makenewArr();
    this.putArrInProps(arrOfObj);
  };
  componentWillMount() {
    this.setState({ id: this.props.id });
  }
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
      // arrOfObj[this.props.id].id = this.props.id;
      // this.id++;
      console.log("arrOfObjWithId", arrOfObj[0]);
      this.props.changeArrOfSelectedCountries(arrOfObj);
      console.log("selectedCountries", this.props.selectedCountries);
    } else {
      this.props.changeArrOfCountries(arrOfObj);
      console.log("changesArr", this.props.countries);
    }
  }
  componentWillUnmount() {
    console.log("componenttWillunmount");
    this.props.cleanCountries();
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
    const { countries, isLoading, selectedCountries } = this.props;
    console.log("selectedCountries", selectedCountries);
    console.log("cleanCountries", this.props.countries);
    return isLoading ? (
      <Spin />
    ) : this.props.countries.length === 1 ? (
      <div>
        <AutoComplete
          style={{ width: 200 }}
          onChange={value => {
            console.log("onchange");
            return this.onChange(value);
          }}
          value={this.state.inputcountry}
          filterOption={(inputValue, option) =>
            option.props.children
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
        />
        <Description country={selectedCountries[this.props.id]}></Description>
      </div>
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
