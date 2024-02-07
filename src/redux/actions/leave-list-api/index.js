import { LEAVE_LIST_FULFILLED, LEAVE_LIST_PENDING, LEAVE_LIST_REJECTED } from "../../types";
import axiosPrivateHttp from "../../../server/axios/axiosPrivateHttp";

export function fetchLeaveList(companyId) {
    return async (dispatch) => {
        try {
            dispatch({ type: LEAVE_LIST_PENDING })
            const response = await axiosPrivateHttp.get(`/api/HRM/LeaveTyppeList?CompanyID=${companyId}`)
            if (response) {
                dispatch({ type: LEAVE_LIST_FULFILLED, payload: response.data })
                return
            }
        } catch (error) {
            dispatch({type:LEAVE_LIST_REJECTED})
        }
    }
}