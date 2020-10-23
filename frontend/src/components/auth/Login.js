import React, {useState, useContext} from 'react';
import { useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async(e) => {
        try {

            e.preventDefault();
            const loginUser = {email, password };
            const loginRes = await Axios.post("http://localhost:8080/users/login", loginUser);
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch(error) {
            //if not undefined,(aka if true on both sides) then set error
            error.response.data.msg && setError(error.response.data.msg);
        }
    }

    return (
        <div className="container">
              <div className="innerWidth">
        <h2>Log in</h2>
        {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
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