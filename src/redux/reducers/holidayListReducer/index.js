const initialState = {
  data: null,
  isloading: false,
  IsError: false
}

const holidayListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HOLIDAY_LIST_PENDING":
      return {
        ...state, 
        isloading: true
      };
    case "HOLIDAY_LIST_FULFILLED":
      return {
        ...state,
        data: action.payload,
        isloading: false
      };
    case "HOLIDAY_LIST_REJECTED":
      return {
        ...state,
        IsError: action.payload
      };
    case "RESET_ALL":
      return initialState;
    default:
      return state;
  }
};
export default holidayListReducer;