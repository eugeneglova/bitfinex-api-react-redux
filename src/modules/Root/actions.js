import { types, NAME as ROOT_NAME } from "./reducer";
import { actions as bookActions } from "../Book/actions";

let wss;

const channel2actions = {
  book: bookActions
};

export const actions = {
  connect: () => (dispatch, getState) => {
    wss = new WebSocket("wss://api.bitfinex.com/ws/2");
    wss.onopen = () => {
      dispatch(actions.changeConnectionStatus(true));
      dispatch(actions.subscribe("book"));
    };
    wss.onmessage = msg => {
      const data = JSON.parse(msg.data);
      if (data.event === "subscribed") {
        dispatch(actions.subscribed(data));
        dispatch(channel2actions[data.channel].subscribed(data));
      }
      if (Array.isArray(data) && data.length === 2) {
        const subscriptions = getState()[ROOT_NAME].subscriptions;
        const channel = Object.keys(subscriptions).find(
          key => subscriptions[key].chanId === data[0]
        );
        if (channel) {
          dispatch(channel2actions[channel].message(data[1]));
        }
      }
    };
  },
  changeConnectionStatus: payload => ({
    type: types.CHANGE_CONNECTION_STATUS,
    payload
  }),
  subscribe: payload => dispatch => {
    const msg = {
      channel: payload,
      event: "subscribe",
      // freq: "F0",
      freq: "F1",
      len: 25,
      prec: "P0",
      symbol: "tBTCUSD"
    };
    wss.send(JSON.stringify(msg));
  },
  subscribed: payload => ({ type: types.SUBSCRIBED, payload }),
  message: payload => ({ type: types.MESSAGE, payload })
};
