import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actions as rootActions, NAME as ROOT_NAME } from "../../Root";
import { actions as tradesActions, NAME as TRADES_NAME } from "..";
import Trades from "../../Trades/components/Trades";

const mapStateToProps = state => {
  return {
    ...state[ROOT_NAME],
    ...state[TRADES_NAME]
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...rootActions,
      ...tradesActions
    },
    dispatch
  );

const TradesContainer = props => <Trades {...props} />

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradesContainer);
