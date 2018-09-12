import { COUNT_UP, COUNT_DONW } from "../constants/action_types";

const initialState = {
  count: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COUNT_UP:
      return {
        ...state,
        count: ++state.count
      };
    case COUNT_DONW:
      return {
        ...state,
        count: --state.count
      }
    default:
      return state
  }
}
