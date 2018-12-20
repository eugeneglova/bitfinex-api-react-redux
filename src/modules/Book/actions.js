import { types, NAME as BOOK_NAME } from "./reducer";

export const actions = {
  subscribed: payload => ({ type: types.SUBSCRIBED, payload }),
  message: payload => (dispatch, getState) => {
    console.log(payload);
    if (!Array.isArray(payload)) return;
    const shanshotSize = parseInt(getState()[BOOK_NAME].channel.len) * 2;
    if (payload.length === shanshotSize) {
      return dispatch(actions.setSnapshot(payload));
    }
    dispatch({ type: types.UPDATE, payload });
  },
  setSnapshot: payload => ({ type: types.SET_SNAPSHOT, payload }),
  update: payload => ({ type: types.UPDATE, payload })
};
