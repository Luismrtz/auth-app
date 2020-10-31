import React, {useState, useContext, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import {UserContext} from '../../context/UserContext';
// import Axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';
import {loginUser, logout, clearError} from '../../actions/userActions';


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {state, dispatch} = useContext(UserContext);


    
    const history = useHistory();
    



        const submit = async(e) => {
        e.preventDefault();


		try {
            let response = await loginUser(dispatch, { email, password });
           
			if (response) {
                props.history.push('/');
            }
            return;
			
		} catch (error) {
            console.log(error);
			// error.response.data.msg && setError(error.response.data.msg);
		}


    }
    console.log(state.error);
    return (
        <div className="container">
              <div className="innerWidth">
        <h2>Log in</h2>
  
        {state.error !== null && <ErrorNotice message={state.error} clearError={() => clearError(dispatch)} />}
        <form onSubmit={submit} className="form">
            <label htmlFor="login-email">Email</label>
            <input id="login-email" type="email" onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="login-password">Password</label>
            <input id="login-password" type="password" onChange={(e) => setPassword(e.target.value)} />

            <input type="submit" value="Login" />
        </form>
        </div>
     </div>
    )
}

export default Login