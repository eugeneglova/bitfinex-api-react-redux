import { types } from "./reducer";

export const actions = {
  subscribed: payload => ({ type: types.SUBSCRIBED, payload }),
  message: payload => dispatch => {
    if (!Array.isArray(payload)) return;
    if (Array.isArray(payload[1])) {
      return dispatch(actions.setSnapshot(payload[1]));
    }
    if (Array.isArray(payload[2])) {
      return dispatch({
        type: types.UPDATE,
        payload: [payload[1], payload[2]]
      });
    }
  },
  setSnapshot: payload => ({ type: types.SET_SNAPSHOT, payload }),
  update: payload => ({ type: types.UPDATE, payload })
};
