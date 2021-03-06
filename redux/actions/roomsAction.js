import axios from "axios"
import { ALL_ROOMS_FAIL,
    ALL_ROOMS_SUCCESS,
    CLEAR_ERRORS,
    ROOM_DETAILS_FAIL,
    ROOM_DETAILS_SUCCESS,
    NEW_REVIEW_FAIL, 
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_REQUEST,
} from "../constants/roomConstants"
import absoluteUrl from "next-absolute-url";

export const getRooms =(req, currentPage = 1, location ='', guests,category) => async(dispatch) =>{
    try {
        const {origin} = absoluteUrl(req)
        let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`;
        if(guests) link =link.concat(`&guestCapacity=${guests}`)
        if(category) link=link.concat(`&category=${category}`)
        const {data} = await axios.get(link);
        dispatch({
            type:ALL_ROOMS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_ROOMS_FAIL,
            payload:error.response.data.message
        })
    }
}
export const getRoomDetails =(req,id) => async(dispatch) =>{
    const {origin} = absoluteUrl(req)
    try {
        const {data} = await axios.get(`${origin}/api/rooms/${id}`);
        dispatch({
            type:ROOM_DETAILS_SUCCESS,
            payload: data.room
        })
    } catch (error) {
        dispatch({
            type: ROOM_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}
export const newReview =(reviewData) => async(dispatch) =>{
    try {
        dispatch({type: NEW_REVIEW_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.put(`/api/reviews`,reviewData,config);
        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload:error.response.data.message
        })
    }
}

export const clearErrors =()=> async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}