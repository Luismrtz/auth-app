import React, {useState, useContext} from 'react';
import {UserContext} from '../../context/UserContext';
import ErrorNotice from '../misc/ErrorNotice';
import {register, clearError} from '../../actions/userActions';


function Register(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setDisplayName] = useState();
    const {state, dispatch} = useContext(UserContext);



    const submit = async(e) => {
        e.preventDefault();
        try {
            let response = await register(dispatch, { email, password, passwordCheck, isAdmin, name });
            if (response) {
                props.history.push('/');
            }
            
            
            return;

     } catch(error) {
         console.log(error)

     }
    
     }
    return (
        <div className="container">
            <div className="innerWidth">

            
           <h2>Register</h2>
           {/* //todo if there was an error found from catch, push setState as prop for <ErrorNotice/> */}
           {(state.error !== null && (typeof state.error === 'string')) && <ErrorNotice message={state.error} clearError={() =>  clearError(dispatch)} />}
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
