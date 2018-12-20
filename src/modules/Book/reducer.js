export const initialState = {
  channel: {},
  snapshot: {},
  updates: []
};

export const NAME = "Book";

export const types = {
  SUBSCRIBED: `${NAME}/SUBSCRIBED`,
  SET_SNAPSHOT: `${NAME}/SNAPSHOT`,
  UPDATE: `${NAME}/UPDATE`
};

const keyReducer = (acc, a) => ({ ...acc, [a[0]]: { price: a[0], count: a[1], amount: a[2] } })

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
      // price
      // count
      // amount
      const [price, count, amount] = action.payload;
      if (count > 0) {
        //add/update price level
        if (amount > 0) {
          //add/update bids
        } else if (amount < 0) {
          //add/update asks
        }
      } else if (count === 0) {
        if (amount === 1) {
          // remove from bids
        } else if (amount === -1) {
          // remove from asks
        }
      }
      return {
        ...state,
        updates: [...state.updates, action.payload]
      };

    default:
      return { ...state };
  }
}
