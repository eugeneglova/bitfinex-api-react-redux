import { types, NAME as ROOT_NAME } from "./reducer";
import { actions as bookActions } from "../Book/actions";
import { actions as tradesActions } from "../Trades/actions";

let wss;

const channel2actions = {
  book: bookActions,
  trades: tradesActions
};

export const actions = {
  connect: () => (dispatch, getState) => {
    wss = new WebSocket("wss://api.bitfinex.com/ws/2");
    wss.onopen = () => {
      dispatch(actions.changeConnectionStatus(true));
      // dispatch(actions.subscribeToBook());
      dispatch(actions.subscribeToTrades());
    };
    wss.onmessage = msg => {
      const data = JSON.parse(msg.data);
      if (data.event === "subscribed") {
        dispatch(actions.subscribed(data));
        dispatch(channel2actions[data.channel].subscribed(data));
      }
      if (Array.isArray(data) && data.length > 1) {
        const subscriptions = getState()[ROOT_NAME].subscriptions;
        const channel = Object.keys(subscriptions).find(
          key => subscriptions[key].chanId === data[0]
        );
        if (channel) {
          dispatch(channel2actions[channel].message(data));
        }
      }
    };
  },
  changeConnectionStatus: payload => ({
    type: types.CHANGE_CONNECTION_STATUS,
    payload
  }),
  subscribeToBook: (payload = {}) => dispatch => {
    const msg = {
      channel: "book" || payload.channel,
      event: "subscribe",
      freq: "F0",
      len: 25,
      prec: payload.prec || "P0",
      symbol: "tBTCUSD"
    };
    wss.send(JSON.stringify(msg));
  },
  subscribeToTrades: payload => dispatch => {
    const msg = {
      channel: "trades" || payload.channel,
      event: "subscribe",
      symbol: "tBTCUSD"
    };
    wss.send(JSON.stringify(msg));
  },
  unsubscribe: chanId => dispatch => {
    const msg = {
      event: "unsubscribe",
      chanId
    };
    wss.send(JSON.stringify(msg));
  },
  subscribed: payload => ({ type: types.SUBSCRIBED, payload }),
  message: payload => ({ type: types.MESSAGE, payload }),
  decreasePrecision: channel => (dispatch, getState) => {
    const subscriptions = getState()[ROOT_NAME].subscriptions;
    const currentPrec = parseInt(subscriptions[channel].prec.slice(1));
    const prec = "P" + (currentPrec + 1);
    dispatch(actions.unsubscribe(subscriptions[channel].chanId));
    dispatch(actions.subscribeToBook({ channel, prec }));
  },
  increasePrecision: channel => (dispatch, getState) => {
    const subscriptions = getState()[ROOT_NAME].subscriptions;
    const currentPrec = parseInt(subscriptions[channel].prec.slice(1));
    const prec = "P" + (currentPrec - 1);
    dispatch(actions.unsubscribe(subscriptions[channel].chanId));
    dispatch(actions.subscribeToBook({ channel, prec }));
  }
};
