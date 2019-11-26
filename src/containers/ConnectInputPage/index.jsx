import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as customActions } from "../../store/custom";

import InputPage from "../../components/pages/InputPage";

const mapStateToProps = state => {
  console.log("state", state);
  return {
    people: state.custom.countries
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPeople: customActions.getCountries
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InputPage);
