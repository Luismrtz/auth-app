//import {combineReducers} from './combineReducer'

export default (state={}, action) => {
    switch(action.type) {

        case 'REQUEST_LOGIN': 
            return {
                ...state,
                loading: true,
            };

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                loading: false, 
            }
        case 'LOGOUT':
           // localStorage.clear()
     localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
            return {
                ...state,
                user:"",
                token:"",
            };
        case 'LOGIN_ERROR':
            return{
                ...state,
                loading: false,
                error: action.payload
            };
            case 'CLEAR_ERROR':
                return{
                    // ...state,
                    loading: false,
                    error: action.payload
                };


            //todo test register reducer
            case 'USER_REGISTER_REQUEST':
                return { ...state, loading: true};
            case 'USER_REGISTER_SUCCESS':
                return {
                    ...state, 
                    user: action.payload.user,
                    token: action.payload.token,
                //    allUserData: action.payload
                loading: false, 
                };
            case 'USER_REGISTER_FAIL':
                return {...state, loading: false, error: action.payload};
          //  default: return state;


          //todo GET USERS and store in array
            case 'USER_GET_REQUEST':
                return {...state, loading: true};
            case 'USER_GET_SUCCESS':
                return {...state, 
                    // user: action.payload.user,
                    // token: action.payload.token,
                    allUserData: action.payload, loading: false}
            case 'USER_GET_FAIL':
                return { ...state, laoding: false, error: action.payload}

                      //todo DELETE single USER from array
            case 'USER_DELETE_REQUEST':
                return {...state, loading: true};
            case 'USER_DELETE_SUCCESS':
                return {...state, 
                    allUserData: state.allUserData.filter(userData => userData._id !== action.payload),
                    loading: false}
            case 'USER_DELETE_FAIL':
                return { ...state, laoding: false, error: action.payload}
        default: 
             return state;
    }
}

// function getUsersReducer(state={}, action) {
//     switch(action.type) {
//     case 'GET_ALL_USER':
//         return {
//             // ...state,
//             //  ...state
//          //   allUserData: action.payload,
//             loading: true,
          
//         };

//     case 'GET_ALL_USER_ERROR':
//         return {
//              ...state,
//          //   ...state.allUserData,
//             loading: false,
//             error: action.error
//         };

//     case 'GET_ALL_USER_SUCCESS':
//         return {
//              ...state,
//             ...state.allUserData,
//             loading: false,
//             allUserData: action.payload
//         };

//         default: 
//             return state;
//     }
// }


//todo register reducer
// function registerReducer(state={}, action) {
//     switch(action.type) {
//         case 'USER_REGISTER_REQUEST':
//             return { loading: true};
//         case 'USER_REGISTER_SUCCESS':
//             return {loading: false, 
//                 ...state, 
//                 user: action.payload.user,
//                 token: action.payload.token,
//             //    allUserData: action.payload
            
//             };
//         case 'USER_REGISTER_FAIL':
//             return {loading: false, error: action.payload};
//         default: return state;
//     }
// }





    //todo ADD register reducers 
            // case 'ADD_USER':
            //     return {
            //         ...state,
            //         allUserData: [...state.allUserData, action.payload]
            //     }
            // case 'ERROR_USER':
            //     return {
            //         ...state,
            //         error: action.payload
            //     }
    //todo DELETE register reducer
        // case 'DELETE_USER':
        // return {
        //     ...state,
        //     allUserData:state.allUserData.filter(allUserData=> allUserData.id !== action.payload)
        // }


 //const userReducer = combineReducers(loginUserReducer, registerReducer);


 //export default {userReducer}