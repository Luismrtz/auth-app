import React, {useEffect, useContext, useCallback, useState} from 'react'
import {useHistory} from 'react-router-dom';
import {UserContext} from '../../context/UserContext';
import {getUsers, deleteUser} from '../../actions/userActions';
// import { useGlobalSpinnerActionsContext } from '../../context/GlobalSpinnerContext';


import {Link} from 'react-router-dom';
import Axios from 'axios';


const Profile = () => {
    const {state, dispatch} = useContext(UserContext);
    // const setGlobalSpinner = useGlobalSpinnerActionsContext();
    // const {userData, setUserData} = useContext(UserContext);
   // const [userDataAll, setUserDataAll] = useState([])
    const history = useHistory();

    useEffect(() => {

        //todo TURN THIS INTO A DISPATCH(CALL THIS FROM THAT dispatch ACTION js)
        // const checkAllUsers = async () => {

        //         const userRes = await Axios.get("/users/all");
        //     setUserDataAll(userRes);
        //     }
        //     getUsers(dispatch)
        

        // checkAllUsers()
        state.user ?
        getUsers(dispatch)
        : 
        history.push("/");
    }, [deleteUser])

// useEffect(() => {
//     getUser(dispatch)
//     return () => {
        
//     }
// }, [])

const deleteHandler = (user) => {
    const _id = user._id;
    //dispatch(deleteProduct(user._id))

    deleteUser(dispatch, {_id})
   
}





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




    //todo: TOMORROW 10/31
        //* implement ADMIN ONLY for deletes
        //* implement maybe another api + dispatch for USER(auth) ONLY delete call
        //* implement ROUTES access via AUTH or ADMIN (ex. cannot access profile unless AUTH or ADMIN/ signed in)
        //* fix CSS
        //* 


    let usersAll = state.allUserData;
    // console.log(state)
    // //console.log(state.allUserData[0].email)
    // console.log(usersAll)
    // console.log(state.allUserData[1] && state.allUserData[1]._id)
    let mainUser = state.user;
//   console.log(mainUser);

//   console.log(usersAll[0])
//   console.log(mainUser.id);

    // return (
    return mainUser && mainUser ? 
    (

    <div className="mainContainer">

        <div className="content">
            <div className="productHeader">
                <h3>ALL USERS</h3>
            </div>
           
            <div className="productList">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>CreatedAt</th>
                            <th>EMAIL</th>
                            <th>NAME</th>
                            <th>ISADMIN</th>    
                            
                            <th>Delete</th>     
                        </tr>
                    </thead>

                    <tbody>
                        {usersAll && usersAll.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                {/* <td>{user.createdAt.substring(0, 10)}</td> */}
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{JSON.stringify(user.isAdmin)}</td>

                                <td>
           
                                     { mainUser.isAdmin === true || (user._id) === mainUser.id ? 
                                        <button type="button" className="button" 
                                        // onClick={() => {const _id = user._id; deleteUser(dispatch, {_id})}}
                                        onClick={() => deleteHandler(user)}
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