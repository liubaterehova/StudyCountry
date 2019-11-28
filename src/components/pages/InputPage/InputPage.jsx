import React, { Component } from "react";
import { AutoComplete, Descriptions, Spin } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Description from "../../Description";
export default class InputPage extends Component {
  constructor(props) {
    super(props);
    this.props.cleanCountries();
  }
  id = 0;
  state = {
    inputcountry: "",
    weathers: [],
    holidays: [],
    id: "",
    obj: null
  };

  componentWillMount() {
    console.log("willmount");
    this.setState({ id: this.props.id });
  }
  componentDidMount() {
    console.log("mount");
  }
  componentWillUnmount() {
    console.log("componenttWillunmount");
    this.props.cleanCountries();
  }
  defineHolidays(country) {
    console.log("holidays");
  }

  onChange = value => {
    console.log("change");
    this.props.getCountries(value);
    this.setState({
      inputcountry: value
    });
    const arrOfObj = this.makenewArr();
    this.putArrInProps(arrOfObj);
  };

  makenewArr() {
    const arrOfObj = [];
    for (let obj of this.props.countries) {
      if (
        obj.name.toLowerCase().includes(this.state.inputcountry.toLowerCase())
      ) {
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
      // arrOfObj[this.props.id].id = this.props.id;
      // this.id++;

      console.log("arrOfObjWithId", arrOfObj[0]);
      this.props.changeArrOfSelectedCountries(arrOfObj);
      this.setState({ obj: arrOfObj });
      console.log("selectedCountries", this.props.selectedCountries);
    } else {
      this.props.changeArrOfCountries(arrOfObj);
      console.log("changesArr", this.props.countries);
    }
  }

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

  onSelect = value => {
    console.log("workWithSelect this.props.countries", this.props.countries);
    const arrForSelect = this.props.countries.keys;
    arrForSelect//   .filter(countryName => countryName.toLowerCase() === value.toLowerCase()); //   .map(country => country.name)
    // console.log("arrForSelect", arrForSelect[0]);
    //////////////вернуть обьект а не строку!!!
    .this.props
      .changeArrOfSelectedCountries(arrForSelect[0]);
  };
  makeArr = arr => {
    return arr.map(item => <li key={item}>{item}</li>);
  };

  makeDataSource = countries => {
    // if (countries.length === undefined) {
    //   return [];
    // }
    const res = countries
      .map(country => country.name.toLowerCase())
      .filter(item => {
        return item.includes(this.state.inputcountry.toLowerCase());
      });
    console.log("datasource", res);
    return res;
  };

  render() {
    const { countries, isLoading, selectedCountries } = this.props;
    console.log("selectedCountries", selectedCountries);
    console.log("cleanCountries", this.props.countries);
    return isLoading ? (
      <Spin />
    ) : this.props.countries.length === 1 &&
      this.state.inputcountry.toLowerCase() ===
        this.props.countries[0].name.toLowerCase() ? (
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
