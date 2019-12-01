import React, { Component } from "react";
import InputCountry from "../../organisms/InputCountry";
import Description from "../../organisms/Description";

export default class TabPage extends Component {
  render() {
    const {
      id,
      tabInfo,
      getCountries,
      addNewTabInfo,
      getWeathers,
      getHolidays
    } = this.props;

    const {
      listCountries,
      isCountriesLoading,
      country,
      weathers,
      isWeathersLoading,
      isHolidaysLoading,
      holidays
    } = tabInfo;

    return (
      <div>
        <InputCountry
          id={id}
          listCountries={listCountries}
          isCountriesLoading={isCountriesLoading}
          getCountries={getCountries}
          addNewTabInfo={addNewTabInfo}
          getWeathers={getWeathers}
          getHolidays={getHolidays}
        />
        {country ? (
          <Description
            country={country}
            weathers={weathers}
            holidays={holidays}
            isWeathersLoading={isWeathersLoading}
            isHolidaysLoading={isHolidaysLoading}
          />
        ) : null}
      </div>
    );
  }
}
