import { GENERATE_TOKEN_FULFILLED, GENERATE_TOKEN_PENDING, GENERATE_TOKEN_REJECTED } from "../../types";
import axiosPublicHttp from "../../../server/axios/axiosPublicHttp";

export function generateUserTokenAPI(payload) {
   return async (dispatch) => {
      try {
         dispatch({ type: GENERATE_TOKEN_PENDING });
         const response = await axiosPublicHttp.post('/api/Token/ReLogin', payload);
         if (response?.data) {
            localStorage.setItem('HRMtoken', response.data.token);
            dispatch({ type: GENERATE_TOKEN_FULFILLED, payload: response.data });
            return
         }
      } catch (error) {
         dispatch({ type: GENERATE_TOKEN_REJECTED });
      }
   }
}
