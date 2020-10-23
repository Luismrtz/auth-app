import React, {useEffect, useContext, useCallback, useState} from 'react'
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
// import { useGlobalSpinnerActionsContext } from '../../context/GlobalSpinnerContext';


import {Link} from 'react-router-dom';
import Axios from 'axios';


const Profile = () => {

    // const setGlobalSpinner = useGlobalSpinnerActionsContext();
    const {userData, setUserData} = useContext(UserContext);
    const [userDataAll, setUserDataAll] = useState([])
    const history = useHistory();

    useEffect(() => {

        //todo TURN THIS INTO A DISPATCH(CALL THIS FROM THAT dispatch ACTION js)
        const checkAllUsers = async () => {

                const userRes = await Axios.get("http://localhost:8080/users/all");
            setUserDataAll(userRes);
            }
        

        checkAllUsers()
    }, [])








   //todo TURN THIS INTO A DISPATCH(CALL THIS FROM THAT dispatch ACTION js)
    // const deleteHandler = async(user) => {
    //     // let token = localStorage.getItem("auth-token");
    //     // if(token === null) {
    //     //     localStorage.setItem("auth-token", "");
    //     //     token = "";
    //     // }
        
    //     //  const tokenRes = await Axios.post("http://localhost:8080/users/tokenIsValid", 
    //     //  null, 
    //     //  { headers: {"x-auth-token": token}
    //     //      }
    //     //  );
        

    //    await Axios.delete("http://localhost:8080/users/" + user._id)
                
                
 
    // }




    console.log(userData)
    // console.log(userDataAll)
    // console.log(userDataAll.data)
    
    let usersAll = userDataAll.data;
    // console.log(usersAll._id)
    let mainUser = userData.user
  

    // return (
    return mainUser && mainUser.isAdmin === true ? 
    (

    <div className="mainContainer">

        <div className="content">
            <div className="productHeader">
                <h3>ORDERS</h3>
            </div>
           
            <div className="productList">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>EMAIL</th>
                            <th>NAME</th>
                            <th>ISADMIN</th>    
                            <th>Delete</th>     
                        </tr>
                    </thead>

                    <tbody>
                        {usersAll.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.isAdmin}</td>
                  
                                <td>
                                    { mainUser.isAdmin? 
                                        <button type="button" className="button" 
                                        // onClick={() => deleteHandler(user)}
                                        >
                                            Delete
                                        </button>
                                     : user._id === mainUser.Id  ?
                                    
                                        <button type="button" className="button" 
                                        // onClick={() => deleteHandler(user)}
                                        >
                                            Delete
                                        </button> 
                                        :
                                        <div></div>

                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>



            </div>
        </div>

        <div>PROFILE PAGE</div>
        {/* <div>{userData.user.name}</div> */}


    </div>
      
    )
     : (<div>cannot access page</div>)
}

export default Profile;