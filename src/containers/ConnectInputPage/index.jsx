import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as customActions } from "../../store/custom";

import InputPage from "../../components/pages/InputPage";

const mapStateToProps = state => {
  console.log("state", state);
  return {
    countries: state.custom.countries,
    weathers: state.custom.weathers
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCountries: customActions.getCountries,
      getWeathers: customActions.getWeathers
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InputPage);
