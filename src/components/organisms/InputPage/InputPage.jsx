import React, { Component } from "react";
import { AutoComplete, Spin } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Description from "../../organisms/Description";

export default class InputPage extends Component {
  constructor(props) {
    super(props);
    this.props.cleanCountries();
  }
  id = 0;
  state = {
    inputcountry: "",
    id: "",
    obj: null
  };

  componentDidUpdate(oldProps, oldState) {
    if (
      this.state.inputcountry === oldState.inputcountry &&
      this.props.countries === oldProps.countries
    ) {
      return;
    }
    this.selectCountry();
  }

  onChange = value => {
    this.props.getCountries(value);
    this.setState({
      inputcountry: value
    });
  };

  selectCountry = () => {
    if (
      this.props.countries.length &&
      this.state.inputcountry.toLowerCase() ===
        this.props.countries[0].name.toLowerCase()
    ) {
      this.props.changeArrOfSelectedCountries({
        country: this.props.countries[0],
        id: this.props.id
      });
      this.props.getWeathers({
        country: this.props.countries[0].capital,
        id: this.props.id
      });

      this.props.getHolidays({
        country: this.props.countries[0].alpha2Code,
        id: this.props.id
      });
    }
  };

  makeDataSource = countries => {
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

    return (
      <div>
        <AutoComplete
          style={{ width: 200 }}
          dataSource={this.makeDataSource(countries)}
          onSearch={value => {
            console.log("onsearch");
            return this.onChange(value);
          }}
          value={this.state.inputcountry}
          filterOption={(inputValue, option) =>
            option.props.children
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={value => {
            this.onChange(value);
            console.log("onSelect");
            console.log(this.props.selectedCountries);
          }}
        />
        {isLoading ? (
          <Spin />
        ) : selectedCountries[this.props.id] ? (
          <Description
            country={selectedCountries[this.props.id]}
            id={this.props.id}
          />
        ) : null}
      </div>
    );
  }
}
