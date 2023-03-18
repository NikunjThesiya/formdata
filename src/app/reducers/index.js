import { combineReducers } from "redux";
import personListReducer from "./personListReducer";

const reducers = combineReducers({
	persons: personListReducer,
});

export default reducers;
