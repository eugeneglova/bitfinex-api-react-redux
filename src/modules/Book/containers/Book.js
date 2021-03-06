import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actions as rootActions, NAME as ROOT_NAME } from "../../Root";
import { actions as bookActions, NAME as BOOK_NAME } from "../";
import Book from "../../Book/components/Book";

const mapStateToProps = state => {
  return {
    ...state[ROOT_NAME],
    ...state[BOOK_NAME]
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...rootActions,
      ...bookActions
    },
    dispatch
  );

const BookContainer = props => <Book {...props} />

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookContainer);
