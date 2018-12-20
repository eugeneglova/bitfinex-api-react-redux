export const initialState = {
  channel: {},
  snapshot: [],
  updates: []
};

export const NAME = "Book";

export const types = {
  SUBSCRIBED: `${NAME}/SUBSCRIBED`,
  SET_SNAPSHOT: `${NAME}/SNAPSHOT`,
  UPDATE: `${NAME}/UPDATE`
};

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
        snapshot: action.payload
      };

    case types.UPDATE:
      return {
        ...state,
        updates: [...state.updates,action.payload]
      };

    default:
      return { ...state };
  }
}
