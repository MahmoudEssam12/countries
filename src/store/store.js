import { legacy_createStore as createStore } from "redux";
import { darkmodeReducer } from "./reducers/darkmode";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(darkmodeReducer, composeWithDevTools())

export default store;