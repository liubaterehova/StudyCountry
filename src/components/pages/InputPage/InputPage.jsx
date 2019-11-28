import React, { Component } from "react";
import { AutoComplete, Descriptions, Spin } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Spinner from "../../spinner/";
import Description from "../../Description";
export default class InputPage extends Component {
  id = 0;
  state = {
    inputcountry: "",
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
      inputcountry: value
    });
  };
  makenewArr() {
    const arrOfObj = [];
    for (let obj of this.props.countries) {
      if (obj.name.includes(this.state.inputcountry)) {
        arrOfObj.push(obj);
      }
    }
  }
  //   const arrOfNames = this.getCountriesName(this.props.countries);
  //   this.setState({
  //     arrOfNames: arrOfNames
  //   });
  //   //   if (!arrOfObj.length) {
  //       this.props.cleanCountries();
  //       // console.log("after clean", this.props.countries);
  //     } else if (arrOfObj.length === 1) {
  //       console.log("arrOfObj", arrOfObj[0]);
  //       console.log("id", this.id);
  //       arrOfObj[this.id].id = this.id;
  //       this.id++;
  //       console.log("arrOfObjWithId", arrOfObj[0]);
  //       this.props.changeArrOfCountries(arrOfObj[0]);
  //       console.log("oneElementProps", this.props.countries);
  //     } else {
  //       this.props.changeArrOfCountries(arrOfObj);
  //       console.log("changesArr", this.props.countries);
  //     }
  // };

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
    const res = countries
      .map(country => country.name)
      .filter(item => item.includes(this.state.inputcountry));
    console.log("datasource", res);
    return res;
  }

  render() {
    const { countries, weathers, isLoading } = this.props;
    // if (isLoading) {
    //   return <Spin />;
    // }
    console.log("countries", countries);
    if (this.props.countries.length === 1) {
      const {
        name,
        capital,
        alpha2code,
        latlng,
        translations,
        population
      } = countries[0];

      return <Description country={countries[0]}></Description>;
    }
    return (
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
    );
  }
}
