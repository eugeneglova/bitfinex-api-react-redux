export const initialState = {
  channel: {},
  trades: {}
};

export const NAME = "Trades";

export const types = {
  SUBSCRIBED: `${NAME}/SUBSCRIBED`,
  SET_SNAPSHOT: `${NAME}/SNAPSHOT`,
  UPDATE: `${NAME}/UPDATE`
};

const keyReducer = (acc, a) => ({
  ...acc,
  [a[0]]: { id: a[0], mts: a[1], amount: a[2], price: a[3] }
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
        trades: action.payload.reduce(keyReducer, {})
      };

    case types.UPDATE:
      const trade = action.payload[1];

      return {
        ...state,
        trades: {
          ...state.trades,
          ...[trade].reduce(keyReducer, {})
        }
      };

    default:
      return { ...state };
  }
}
