import React, {useEffect, useContext, useCallback} from 'react'
import {useHistory} from 'react-router-dom';
// import {UserContext} from '../../context/UserContext';
// import { useGlobalSpinnerActionsContext } from '../../context/GlobalSpinnerContext';


import {Link} from 'react-router-dom';


const Home = (props) => {

    // const setGlobalSpinner = useGlobalSpinnerActionsContext();
    // const {state} = useContext(UserContext);
    const history = useHistory();


// console.log(userData.user && userData.user.Id)

    // const submit = async(e) => {
    //     e.preventDefault();
    //     try {

    //     const newUser = {email, password, passwordCheck, isAdmin, name:displayName};
    //      await Axios.post("http://localhost:8080/users/register",
    //     newUser
    //     );
    //     const loginRes = await Axios.post("http://localhost:8080/users/login", {
    //     email,
    //     password
    //     });
    //     setUserData({
    //         token: loginRes.data.token,
    //         user: loginRes.data.user
    //     });
    //     localStorage.setItem("auth-token", loginRes.data.token);
    //     history.push("/");
    // } catch(error) {
    //     //if not undefined,(aka if true on both sides) then set error
    //     // if there is an error, and not just an undefined.  setError to that message as string
    //     error.response.data.msg && setError(error.response.data.msg);
    // }
    
    // }




    //console.log(userData.user.email)
//   console.log(userInfo)

    // const deleteHandler = (order) => {
    //     dispatch(deleteOrder(order._id))
    // }
    
    // return state.user && state.user.isAdmin === false ? 
    return(

    <div className="mainContainer">
{/* 
        <div className={styles.content}>
            <div className={styles.productHeader}>
                <h3>ORDERS</h3>
            </div>
           
            <div className={styles.productList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>EMAIL</th>
                            <th>NAME</th>
                            <th>ISADMIN</th>         
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.user.name}</td>
                                <td>{order.isPaid.toString()}</td>
                                <td>{order.paidAt}</td>
                                <td>{order.isDelivered.toString()}</td>
                                <td>{order.deliveredAt}</td>
                                <td>
                                    <Link to={"/order/" + order._id} ><button className={cx(styles.button)}>Details</button></Link>
                                        {' '}
                                    <button type="button" className={cx(styles.button, styles.secondary)} onClick={() => deleteHandler(order)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>



            </div>
        </div> */}

        <div>hellooooooo</div>
        {/* <div>{userData.user.name}</div> */}


    </div>
      
    ) 
    // : (<div>cannot access page</div>)
}

export default Home;