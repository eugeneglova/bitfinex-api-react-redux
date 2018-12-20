import { types, NAME as BOOK_NAME } from "./reducer";

export const actions = {
  subscribed: payload => ({ type: types.SUBSCRIBED, payload }),
  message: payload => (dispatch, getState) => {
    if (!Array.isArray(payload)) return;
    if (!Array.isArray(payload[1])) return;
    const shanshotSize = parseInt(getState()[BOOK_NAME].channel.len) * 2;
    if (payload[1].length === shanshotSize) {
      return dispatch(actions.setSnapshot(payload[1]));
    }
    dispatch({ type: types.UPDATE, payload: payload[1] });
  },
  setSnapshot: payload => ({ type: types.SET_SNAPSHOT, payload }),
  update: payload => ({ type: types.UPDATE, payload })
};
