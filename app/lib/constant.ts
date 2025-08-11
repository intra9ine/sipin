
// export const API_END_POINT=`http://localhost:8000/api/` //test
export const API_END_POINT=`https://qrjsp6bx7jfavyantcop76cn5y0vsumn.lambda-url.us-east-1.on.aws/api/` //test


// USER API
export const REGISTER_USER='user/register'
export const LOGIN_USER='user/login'
export const USERS='user'
export const EDIT_INFO='user/edit'
export const GET_ALL_USERS='user/getAll'
export const UPDATE_USER='user/updateStatus'
export const USER_INFO='user/getById'
export const DASHBOARD_INFO='user/dashboard'

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
export const USER_NAME='__uets@!9!n^al$$*12%'


 export const schemeData=[
    {
        id:1,
        schemeLists:[
            {
                scheme_id:6,
                data:'100000 turnover - 10 Months'
                
            },
           
        ],
         title:'Free',
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


 export const menuItems = [
    { name: "Dashboard", title: "Dashboard", path: "/dashboard", iconName: "dashboard" },
    { name: "Scheme", title: "Scheme", path: "/scheme", iconName: "scheme" },
    { name: "Payment", title: "Payment", path: "/payment", iconName: "transaction" },
    { name: "Bid Management", title: "Bid Management", path: "/bid-management", iconName: "bid" },
    { name: "Profile", title: "Admin Profile", path: "/profile", iconName: "profile" },
    { name: "Logout", title: "", path: "/login", iconName: "logout" },
  ];