import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actions as rootActions, NAME as ROOT_NAME } from "../../Root";
import { actions as tickerActions, NAME as TICKER_NAME } from "..";
import Ticker from "../../Ticker/components/Ticker";

const mapStateToProps = state => {
  return {
    ...state[ROOT_NAME],
    ...state[TICKER_NAME]
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...rootActions,
      ...tickerActions
    },
    dispatch
  );

const TickerContainer = props => <Ticker {...props} />

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TickerContainer);
