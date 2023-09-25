import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducerCart from "../reducers/ReducerCart";
const store = createStore(reducerCart, applyMiddleware(thunkMiddleware));
export default store;
