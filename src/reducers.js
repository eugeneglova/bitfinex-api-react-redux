import { combineReducers } from "redux";

import { reducer as rootReducer, NAME as ROOT_NAME } from "./modules/Root";
import { reducer as bookReducer, NAME as BOOK_NAME } from "./modules/Book";
import { reducer as tradesReducer, NAME as TRADES_NAME } from "./modules/Trades";
import { reducer as tickerReducer, NAME as TICKER_NAME } from "./modules/Ticker";

export default combineReducers({
  [ROOT_NAME]: rootReducer,
  [BOOK_NAME]: bookReducer,
  [TRADES_NAME]: tradesReducer,
  [TICKER_NAME]: tickerReducer
});
