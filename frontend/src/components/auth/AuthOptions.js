
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
    const profile = () => history.push('/profile');
    const logoutBtn = () => {
        // setUserData({
        //     token: undefined,
        //     user: undefined
        // });
        // localStorage.setItem("auth-token", "");
        // history.push("/login")
       // console.log('poop');
      //  e.preventDefault();
         logout(dispatch);
        // history.push('/login');
        // console.log(logout(dispatch))
        history.push('/login');
    }



    console.log(state);

    return  (
        <nav className="authOptions">
            {
                state.user?
                <>
                 <button onClick={profile}>Profile</button>
                 <button onClick={logoutBtn}>Log out</button>  
                </>
                 : 
                <>
                 <button onClick={register}>Register</button>
                 <button onClick={login}>Log in</button>
                </>
            }


                 {/* <button onClick={register}>Register</button>
                 <button onClick={login}>Log in</button>
           
             */}
        
        </nav>
    )
}

export default AuthOptions
