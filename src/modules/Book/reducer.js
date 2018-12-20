import _ from "lodash";

export const initialState = {
  channel: {},
  bids: {},
  asks: {}
};

export const NAME = "Book";

export const types = {
  SUBSCRIBED: `${NAME}/SUBSCRIBED`,
  SET_SNAPSHOT: `${NAME}/SNAPSHOT`,
  UPDATE: `${NAME}/UPDATE`
};

const keyReducer = (acc, a) => ({
  ...acc,
  [a[0]]: { price: a[0], count: a[1], amount: a[2] }
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SUBSCRIBED:
      return {
        ...state,
        channel: action.payload
      };

    case types.SET_SNAPSHOT:
      return {
        ...state,
        bids: action.payload.filter(a => a[2] > 0).reduce(keyReducer, {}),
        asks: action.payload.filter(a => a[2] < 0).reduce(keyReducer, {})
      };

    case types.UPDATE:
      const [price, count, amount] = action.payload;

      if (count > 0) {
        //add/update price level
        if (amount > 0) {
          //add/update bids
          return {
            ...state,
            bids: { ...state.bids, ...[action.payload].reduce(keyReducer, {}) }
          };
        } else if (amount < 0) {
          //add/update asks
          return {
            ...state,
            asks: { ...state.asks, ...[action.payload].reduce(keyReducer, {}) }
          };
        }
      } else if (count === 0) {
        if (amount === 1) {
          // remove from bids
          return {
            ...state,
            bids: _.omit(state.bids, price)
          };
        } else if (amount === -1) {
          // remove from asks
          return {
            ...state,
            asks: _.omit(state.asks, price)
          };
        }
      }
      return { ...state };

    default:
      return { ...state };
  }
}
