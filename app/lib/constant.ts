
export const API_END_POINT=`http://localhost:8000/api/` //test

// USER API
export const REGISTER_USER='user/register'
export const LOGIN_USER='user/login'
export const USERS='user'
export const EDIT_INFO='user/edit'
export const GET_ALL_USERS='user/getAll'
export const UPDATE_USER='user/updateStatus'
export const USER_INFO='user/getById'

// PAYMENT
export const PAYMENT='payment'
export const PAYMENT_EDIT='payment/addOrEdit'
export const GET_ALL_PAYMENT='payment/getAll'

// SCHEME PAYMENT
export const SCHEME_PAYMENT='scheme-payment'
export const SCHEME_PAYMENT_EDIT='scheme-payment/addOrEdit'
export const SCHEME_GET_ALL_PAYMENT='scheme-payment/getAll'

// BID
export const MONTHLY_BID='bid'
export const MONTHLY_BID_EDIT='bid/addOrEdit'
export const MONTHLY_BID_WINNER='bid/getWinner'
export const MONTHLY_BID_GET_ALL='bid/getAll'

// SCHEME
export const SCHEME='scheme'
export const GET_ALL_SCHEME='scheme/getAll'
export const EDIT_SCHEME='scheme/addOrEdit'
export const GET_ALL_BID_SCHEME='scheme/getAllBidSchemes'
export const GET_ALL_BID_USERS='scheme/getAllBidUsers'
// button name
export const buttonName={
    ShopNow:"Shop now",
    SignUp:'SUBSCRIBE NOW',
    SigningUp:"Subscribing...",
    GetAQuote:"Get a Quote",
    Send:"Submit Now",
    Sending:'Submitting...',
    AddToCart:'ADD TO CART',
    BuyNow:'BUY NOW',
    ContactUs:'Contact Us',
    AdmissionNow:'admission Now',
    OurCourses:'Our Courses',
    Enroll:'Enroll'

}

export const TOKEN_VALUE='__uets!9!n'
export const USER_VALUE='__uets!9!n^al$'



 export const schemeData=[
    {
        id:1,
        schemeLists:[
            {
                scheme_id:6,
                data:'100000 turnover - 10 Months'
                
            },
           
        ],
         title:'Normal',
         amount:'50'
    },
    {
        id:2,
        schemeLists:
        [
            {
                scheme_id:7,
                data:'100000 turnover - 10 Months'
                
            },
            {
                scheme_id:8,
                data:'25000 turnover - 10 Months'
                
            },
            {
                scheme_id:9,
                data:'50000 turnover - 10 Months'
                
            },
          
           
        ],
         title:'Basic',
         amount:"100",
    },
    {
        id:3,
        schemeLists: [
            {
                scheme_id:6,
                data:'100000 turnover - 10 Months'
                
            },
            {
                scheme_id:7,
                data:'25000 turnover - 10 Months'
                
            },
            {
                scheme_id:8,
                data:'50000 turnover - 10 Months'
                
            },
            {
                scheme_id:9,
                data:'75000 turnover - 10 Months'
                
            },
           
        ],
         title:'Standard',
         amount:'200'
    },
    {
        id:4,
        schemeLists: [
            {
                scheme_id:6,
                data:'100000 turnover - 10 Months'
                
            },
            {
                scheme_id:7,
                data:'25000 turnover - 10 Months'
                
            },
            {
                scheme_id:8,
                data:'50000 turnover - 10 Months'
                
            },
            {
                scheme_id:9,
                data:'75000 turnover - 10 Months'
                
            },
            {
                scheme_id:10,
                data:'100000 turnover - 10 Months'
                
            },
           
        ],
         title:'Premium',
         amount:'300'
    },
 ]