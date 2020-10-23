import React, {useState, useContext, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';
// import { useGlobalSpinnerActionsContext } from '../../context/GlobalSpinnerContext';


function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState("");
  
    // const setGlobalSpinner = useGlobalSpinnerActionsContext();
    const {userData, setUserData} = useContext(UserContext);
    const history = useHistory();


    // useEffect(() => {
    //     (async () => {
    //      setGlobalSpinner(false)

    //      setGlobalSpinner(false)
    //     })()

    // }, [setGlobalSpinner])




    const submit = async(e) => {
        e.preventDefault();
        try {

        const newUser = {email, password, passwordCheck, isAdmin, name:displayName};
         await Axios.post("http://localhost:8080/users/register",
        newUser
        );
        const loginRes = await Axios.post("http://localhost:8080/users/login", {
        email,
        password
        });
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
    } catch(error) {
        //if not undefined,(aka if true on both sides) then set error
        // if there is an error, and not just an undefined.  setError to that message as string
        error.response.data.msg && setError(error.response.data.msg);
    }
    
    }
    return (
        <div className="container">
            <div className="innerWidth">

            
           <h2>Register</h2>
           {/* //todo if there was an error found from catch, push setState as prop for <ErrorNotice/> */}
           {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
           <form onSubmit={submit} className="form">
               <label htmlFor="register-email">Email</label>
               <input id="register-email" type="email" onChange={(e) => setEmail(e.target.value)}/>

               <label htmlFor="register-password">Password</label>
               <input id="register-password" type="password" onChange={(e) => setPassword(e.target.value)} />
               <label htmlFor="register-password">Re-enter password</label>
               <input placeholder="Verify password" type="password" onChange={(e) => setPasswordCheck(e.target.value)} />

               <label htmlFor="mainPage">
                        Want to be an admin? {JSON.stringify(isAdmin)}
                </label>
                <input type="checkbox" checked={isAdmin} name="isAdmin" id="isAdmin" value={isAdmin} onChange={(e) => setIsAdmin(!isAdmin)}></input>


               <label htmlFor="register-display-name">Display name</label>
               <input id="register-display-name" type="text" onChange={(e) => setDisplayName(e.target.value)} />

               <input type="submit" value="Register" />
           </form>
        </div>
        </div>
    )
}

export default Register
