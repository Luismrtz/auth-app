import React, {createContext, useReducer} from 'react';
// import {addUser, deleteUser} from '../actions/userActions'
import userReducer from '../reducer/userReducer';
//import userAction from '../actions/userActions';



//?initial state
// const [userData, setUserData] = useState({
//     token: undefined,
//     user: undefined,
//   }); 

let user = localStorage.getItem("currentUser") 
  ? JSON.parse(localStorage.getItem("currentUser")).user : "";

let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).token : "";



  // let allUserData = JSON.parse(localStorage.getItem("allUsers"));
//................................................. or ).auth_token?

 console.log(JSON.parse(localStorage.getItem("currentUser")))

const initialState = {
   allUserData: [],
    user: "" || user,
    token: "" || token,
    loading: false,
    error: null
}

//create context
export const UserContext = createContext(initialState)

//provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return ( 
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  )
  
}


//Actions 





//todo ADD DELETE action
// async function deleteUser(id) {
//   try {
//     await axios.delete(`users/${id}`);
//     dispatch({
//       type: 'DELETE_USER',
//       payload: id
//     })
//   } catch(err) {
//     dispatch({
//       type: 'ERROR_USER',
//     payload: err.response.data.error
//     })
//   }
// }

//todo ADD register action 
// async function registerUser(name, email, password) {
//   try {
//     let response = await Axios.get("users/register", {
//       headers: { "content-type": application/json },
//     });
//     if(response.user) {
//       dispatch({
//         type: 'ADD_USER',
//         payload: {name, email, password}
//       });
//     }
//   } catch(error) {

//   }
 
// }






// try {

//   const newUser = {email, password, passwordCheck, isAdmin, name:displayName};
//    await Axios.post("http://localhost:8080/users/register",
//   newUser
//   );
//   const loginRes = await Axios.post("http://localhost:8080/users/login", {
//   email,
//   password
//   });
//   setUserData({
//       token: loginRes.data.token,
//       user: loginRes.data.user
//   });
//   localStorage.setItem("auth-token", loginRes.data.token);
//   history.push("/");
// } catch(error) {
//   //if not undefined,(aka if true on both sides) then set error
//   // if there is an error, and not just an undefined.  setError to that message as string
//   error.response.data.msg && setError(error.response.data.msg);
// }










//export default createContext(null);