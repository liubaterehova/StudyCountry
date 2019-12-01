import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as customActions } from "../../store/custom";

import Navigation from "../../components/organisms/Navigation";

const mapStateToProps = (state, props) => {
  console.log("stateTabsInConnect", state);
  return {
    tabs: state.custom
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCountries: customActions.getCountries,
      getWeathers: customActions.getWeathers,
      getHolidays: customActions.getHolidays,
      addNewTabInfo: customActions.addNewTabInfo,
      add: customActions.addTab,
      remove: customActions.removeTab
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
