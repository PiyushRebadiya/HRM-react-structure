import holidayList from './holidayListReducer'
import leaveList from './leaveListReducer'
import user from './userLoginReducer'
import { combineReducers } from "redux";

const allReducers = combineReducers({
  holidayList,
  leaveList,
  user
});

export default allReducers;