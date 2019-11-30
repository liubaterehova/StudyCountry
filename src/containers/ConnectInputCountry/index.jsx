import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as customActions } from "../../store/custom";

import InputCountry from "../../components/organisms/InputCountry";

const mapStateToProps = state => {
  console.log("state", state);
  return {
    listCountries: state.custom.listCountries,
    isLoadingCountries: state.custom.isLoadingCountries,
    tabs: state.custom.tabs
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

export default connect(mapStateToProps, mapDispatchToProps)(InputCountry);
