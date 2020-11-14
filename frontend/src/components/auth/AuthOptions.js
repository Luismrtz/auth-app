
import React, { useContext} from 'react'
import { useHistory} from 'react-router-dom';
import {UserContext} from '../../context/UserContext'
import {logout} from '../../actions/userActions'
const AuthOptions = () => {
    // const {userData, setUserData} = useContext(UserContext);
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();

    const register = () => history.push('/register');
    const login = () => history.push('/login');
    const users = () => history.push('/users');
    const logoutBtn = () => {

         logout(dispatch);

        history.push('/login');
    }


    return  (
        <nav className="authOptions">
            {
                state.user?
                <>
                 <button onClick={users}>Users</button>
                 <button onClick={logoutBtn}>Log out</button>  
                </>
                 : 
                <>
                 <button onClick={register}>Register</button>
                 <button onClick={login}>Log in</button>
                </>
            }

        
        </nav>
    )
}

export default AuthOptions
