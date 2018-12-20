import { combineReducers } from "redux";

import { reducer as rootReducer, NAME as ROOT_NAME } from "./modules/Root";
import { reducer as bookReducer, NAME as BOOK_NAME } from "./modules/Book";

export default combineReducers({
  [ROOT_NAME]: rootReducer,
  [BOOK_NAME]: bookReducer
});
