import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as customActions } from "../../store/custom";

import InputPage from "../../components/pages/InputPage";

const mapStateToProps = state => {
  console.log("state", state);
  return {
    countries: state.custom.countries,
    isLoading: state.custom.isLoading,
    selectedCountries: state.custom.selectedCountries
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCountries: customActions.getCountries,
      getWeathers: customActions.getWeathers,
      getHolidays: customActions.getHolidays,
      cleanCountries: customActions.cleanCountries,
      changeArrOfCountries: customActions.changeArrOfCountries,
      changeArrOfSelectedCountries: customActions.changeArrOfSelectedCountries
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InputPage);
