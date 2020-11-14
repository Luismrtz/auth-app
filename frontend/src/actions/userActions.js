

import Axios from 'axios';




 async function loginUser(dispatch, {email, password}) {
	const requestOptions = {
		method: 'POST',
		// headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(loginPayload),
    url: '/users/login',
    headers: { 'Content-Type': 'application/json' },
    data: {email, password} // axios takes in data
    
	};
	try {

    dispatch({ type: 'REQUEST_LOGIN' });

   let {data} = await Axios( requestOptions);

		if (data.user) {
			dispatch({ type: 'LOGIN_SUCCESS', payload: data });
			localStorage.setItem('currentUser', JSON.stringify(data));
			return data;
		}


	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', payload: error.response.data.msg });
    
	}
}



//?register
async function register(dispatch, {email, password, passwordCheck, isAdmin, name}) {
// const register = ( email, password, passwordCheck, isAdmin, name) => async (dispatch) => {
	const requestReg = {
		method: 'POST',

    url: '/users/register',
    headers: { 'Content-Type': 'application/json' },
    data: {email, password, passwordCheck, isAdmin, name} // axios takes in data
     
	};  



  try {
dispatch({type: 'USER_REGISTER_REQUEST', payload: { email, password, passwordCheck, isAdmin, name}});
    let {data} = await Axios( requestReg);
    if (data.user) {
      dispatch({type: 'USER_REGISTER_SUCCESS', payload: data});
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data;
    }


  } catch(error) {
      dispatch({type: 'USER_REGISTER_FAIL', payload: error.response.data.msg});
  }
}


//?GET USERS
async function getUsers(dispatch) {
  // const register = ( email, password, passwordCheck, isAdmin, name) => async (dispatch) => {
    const requestReg = {
      method: 'GET',
      url: '/users/all',

    };  
  
  
  
    try {
  dispatch({type: 'USER_GET_REQUEST'});
      let {data} = await Axios( requestReg);
      if (data) {
       // const D = JSON.stringify(data)
        dispatch({type: 'USER_GET_SUCCESS', payload: data});
      //  localStorage.setItem('currentUser', JSON.stringify(data));
        return data;
      }
    } catch(error) {
        dispatch({type: 'USER_GET_FAIL', payload: error});
    }
  }



  //? it works now
   function authHeader() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
 
    if (user && user.token) {
      // for Node.js Express back-end
      return {Authorization: 'Bearer ' + user.token};
     //return { 'x-access-token': user.token };
    } else {
      return {};
    }
  }


//? Delete any, Admin rights
async function deleteUser(dispatch, {_id}) {



  const requestReg = {
      method: 'DELETE',
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(loginPayload),
      url: `/users/${_id}`,
      headers: authHeader(),
      data: {_id} // axios takes in data
        // body: JSON.stringify(loginPayload), fetch takes in body
    };  
 
    try {
 
  dispatch({type: 'USER_DELETE_REQUEST', payload: {_id}});
      let {data} = await Axios( requestReg);
      if (data) {
        dispatch({type: 'USER_DELETE_SUCCESS', payload: _id});
    //   localStorage.setItem('currentUser', JSON.stringify(data));
        return data;
      }
  
 
    } catch(error) {
        dispatch({type: 'USER_DELETE_FAIL', payload: error});
    }
  }


  
//? Delete self Only, auth rights
async function deleteSelf(dispatch, {_id}) {
  const requestReg = {
      method: 'DELETE',
      url: `/users/self/${_id}`,
      headers: authHeader(),
      data: {_id} // axios takes in data
    };  
 
    try {
 
  dispatch({type: 'USER_DELETE_REQUEST', payload: {_id}});
      let {data} = await Axios( requestReg);
      if (data) {
        dispatch({type: 'USER_DELETE_SUCCESS', payload: _id});
        dispatch({type: 'LOGOUT'});
        return data;
      }
  
    } catch(error) {
        dispatch({type: 'USER_DELETE_FAIL', payload: error});
    }
  }








    
//const logout = () => (dispatch) => {
function logout(dispatch) {
  
  dispatch({ type: 'LOGOUT' });
  

}

function clearError(dispatch) {
  
  dispatch({ type: 'CLEAR_ERROR', payload: null });
  

}


export {loginUser, logout, register, deleteUser, deleteSelf, getUsers, clearError}

