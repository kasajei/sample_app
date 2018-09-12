import { COUNT_UP, COUNT_DONW } from "../constants/action_types";

export const countUp = () => {
  return {
    type: COUNT_UP
  }
};

export const countDown = () => {
  return {
    type: COUNT_DONW
  }
};
