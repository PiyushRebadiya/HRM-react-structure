const initialState = {
  data: null,
  isloading: false,
  IsError: false
}

const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GENERATE_TOKEN_PENDING":
      return {
        ...state,
        isloading: true
      };
    case "GENERATE_TOKEN_FULFILLED":
      return {
        ...state,
        data: action.payload,
        isloading: false
      };
    case "GENERATE_TOKEN_REJECTED":
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
export default userLoginReducer;