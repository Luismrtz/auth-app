import React, {useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom';
import {UserContext} from '../../context/UserContext';
import {getUsers, deleteUser, deleteSelf} from '../../actions/userActions';


const Profile = () => {
    const {state, dispatch} = useContext(UserContext);

    const history = useHistory();

    useEffect(() => {

        if(!state.user) {
            history.push("/");
        } 
        getUsers(dispatch)
    

    }, [state.user, dispatch, history])



const deleteAnyHandler = (user) => {
    const _id = user._id;

    deleteUser(dispatch, {_id})
   
}
const deleteSelfHandler = (user) => {
    const _id = user._id;

    deleteSelf(dispatch, {_id})
   
}


    let usersAll = state.allUserData;
   
    let mainUser = state.user;

    return mainUser && mainUser ? 
    (

    <div className="mainContainer">
   <div className="titleWrapper">
                    <h2 className="title">All Users</h2>
            </div>
        <div className="content">
         
           
            <div className="productList">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>CREATED</th>
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
                                <td>{user.createdAt.substring(0, 10)}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{JSON.stringify(user.isAdmin)}</td>

                                <td className="btnwrap">
           
                                     { mainUser.isAdmin === true ? 
                                        <button type="button" className="button" 
                                        // onClick={() => {const _id = user._id; deleteUser(dispatch, {_id})}}
                                        onClick={() => deleteAnyHandler(user)}
                                        >
                                            Delete
                                        </button>

                                          :  (user._id) === mainUser.id ? 
                                        <button type="button" className="button" 
                                        // onClick={() => {const _id = user._id; deleteUser(dispatch, {_id})}}
                                        onClick={() => deleteSelfHandler(user)}
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

    </div>
      
    )
     : (<div>cannot access page</div>)
}

export default Profile;