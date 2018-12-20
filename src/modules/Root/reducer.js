export const initialState = {
  connectionStatus: false,
  subscriptions: {}
};

export const NAME = "Root";

export const types = {
  CHANGE_CONNECTION_STATUS: `${NAME}/CHANGE_CONNECTION_STATUS`,
  SUBSCRIBED: `${NAME}/SUBSCRIBED`,
  MESSAGE: `${NAME}/MESSAGE`
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_CONNECTION_STATUS:
      return {
        ...state,
        connectionStatus: action.payload
      };

    case types.SUBSCRIBED:
      return {
        ...state,
        subscriptions: {
          ...state.subscriptions,
          [action.payload.channel]: action.payload
        }
      };

    default:
      return { ...state };
  }
}
