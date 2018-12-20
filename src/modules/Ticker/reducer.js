export const initialState = {
  channel: {},
  ticker: {}
};

export const NAME = "Ticker";

export const types = {
  SUBSCRIBED: `${NAME}/SUBSCRIBED`,
  SET_SNAPSHOT: `${NAME}/SNAPSHOT`
};

const keyReducer = a => ({
  bid: a[0],
  bidSize: a[1],
  ask: a[2],
  askSize: a[3],
  dailyChange: a[4],
  dailyChangePerc: a[5],
  lastPrice: a[6],
  volume: a[7],
  high: a[8],
  low: a[9]
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
        ticker: keyReducer(action.payload)
      };

    default:
      return { ...state };
  }
}
