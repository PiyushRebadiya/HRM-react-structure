const initialState = {
    data: null,
    isloading: false,
    IsError: false
}

const leaveListReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LEAVE_LIST_PENDING":
            return {
                ...state,
                isloading: true
            };
        case "LEAVE_LIST_FULFILLED":
            return {
                ...state,
                data: action.payload,
                isloading: false
            };
        case "LEAVE_LIST_REJECTED":
            return {
                ...state,
                IsError: action.payload
            };
        case "RESET_ALL":
            return initialState;
        default:
            return state;
    }
}
export default leaveListReducer