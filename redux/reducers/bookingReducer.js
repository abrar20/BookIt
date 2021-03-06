import { 
    CHECK_BOOKING_REQUEST,
    CHECK_BOOKING_SUCCESS,
    CHECK_BOOKING_RESET,
    CHECK_BOOKING_FAIL,
    BOOKED_DATES_FAIL,
    BOOKED_DATES_SUCCESS,
    MY_BOOKINGS_FAIL,
    MY_BOOKINGS_SUCCESS,
    BOOKING_DETAILS_FAIL,
    BOOKING_DETAILS_SUCCESS,
    CLEAR_ERRORS } from "../constants/bookingConstants";

export const checkBookingReducer =(state={available:null},action)=>{
    switch (action.type) {
        case CHECK_BOOKING_REQUEST:
            return{
                loading:true,
                
            }
        case CHECK_BOOKING_SUCCESS:
            return{
                loading:false,
                available:action.payload
            }
        case CHECK_BOOKING_RESET:
            return{
                loading:false,
                available:null
            }
        case CHECK_BOOKING_FAIL:
            return{
                loading:false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }
}

//Get All Booked dates
export const bookedDatesReducer =(state={dates:[]},action)=>{
    switch (action.type) {
        case BOOKED_DATES_SUCCESS:
            return{
                loading:false,
                dates:action.payload
            }
        case BOOKED_DATES_FAIL:
            return{
                loading:false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }
}
//Get All My Bookings
export const bookingsReducer =(state={bookings:[]},action)=>{
    switch (action.type) {
        case MY_BOOKINGS_SUCCESS:
            return{
                loading:false,
                bookings:action.payload
            }
        case MY_BOOKINGS_FAIL:
            return{
                loading:false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }
}
//Get  Booking Details
export const bookingDetailsReducer =(state={booking:{}},action)=>{
    switch (action.type) {
        case BOOKING_DETAILS_SUCCESS:
            return{
                loading:false,
                booking:action.payload
            }
        case BOOKING_DETAILS_FAIL:
            return{
                loading:false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }
}