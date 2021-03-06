import rootReducer from '../reducers/root_reducer';
import { createStore, applyMiddleware } from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";

// if (process.env.NODE_ENV !== "production") {
//   // must use 'require' (import only allowed at top of file)
//   const { logger } = require("redux-logger");
//   middlewares.push(logger);
// }

const configureStore = (preloadedState = {}) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger)
  ));

export default configureStore;