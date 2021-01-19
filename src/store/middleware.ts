import {
  SAVE_SETTING
} from './constants/actionTypes';

const localStorageMiddleware = (store:any) => (next:any) => (action:any) => {
  if (action.type === SAVE_SETTING) {
    if (!action.error) {
      window.localStorage.setItem("s_", JSON.stringify(action.payload));
    }
  }

  next(action);
};

export { localStorageMiddleware }