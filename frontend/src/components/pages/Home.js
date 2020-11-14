import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


const Home = (props) => {
    const {state} = useContext(UserContext);
//sandbox for user and admin authentication
// Log in or register to try it out!
    // a sandbox for user login/registration with authentication when recognized as current user and/or contains admin privilege.
    let mainUser = state.user;
  
    return mainUser && mainUser ? 
     (
        <div className="homeLogInContainer">
                <div className="titleWrapper">
                    <h2 className="title">User Profile</h2>
                </div>
            <div className="infoWrapper">
                <ul>
                    <li>Token:<div className="nowrap"> {state.token.substring(0, 20)} ... {" "}
                    {state.token.substr(state.token.length - 20)}</div> </li> 
                    <li>Name: <div className="nowrap">{mainUser.name}</div></li>
                    <li>Email: <div className="nowrap">{mainUser.email}</div></li>
                    <li>Authorities:
                        <ul>
                        {mainUser.isAdmin ? 
                        <><li>User</li> <li>Admin</li></> 
                                :
                            <li>User</li>
                        }
                        </ul>
                    </li>
                </ul>
            </div>
        
    </div>
    )
    :
    (

    <div className="homeContainer">
        <h2>Sandbox for user authentication  </h2>
        <div className="title2"><Link className="redirect" to="/login">Log in</Link> or <Link className="redirect" to="/register">register</Link> to try it out!</div>
    </div>
      
    ) 
    // : (<div>cannot access page</div>)
}

export default Home;