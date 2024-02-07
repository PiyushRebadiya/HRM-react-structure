import { HOLIDAY_LIST_FULFILLED, HOLIDAY_LIST_PENDING, HOLIDAY_LIST_REJECTED } from "../../types";
import axiosPrivateHttp from "../../../server/axios/axiosPrivateHttp";

export function fetchHolidayList(companyId) {
    return async (dispatch) => {
       try {
        dispatch({ type: HOLIDAY_LIST_PENDING });
        const response = await axiosPrivateHttp.get(`/api/HRM/GetHolidayList?CompanyID=${companyId}`);
       if(response){
        dispatch({ type: HOLIDAY_LIST_FULFILLED, payload: response.data });
        return
       }
       } catch (error) {
        dispatch({ type: HOLIDAY_LIST_REJECTED });
       }
    }     
}
