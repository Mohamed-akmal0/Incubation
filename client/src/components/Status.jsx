import React  , {useState,useEffect} from 'react'
import styles from '../stylesheets/login.module.css'
import {Axios} from '../instance'
function Status() {
    const [status , setStatus] = useState({isApproved: ''})
    useEffect(() => {
        let uid = localStorage.getItem('user')
        Axios.get(`/user/getStatus/${uid}`).then((response) => {
            console.log(response.data);
            setStatus(response.data[8])
        })
    } , [])
return (
    <>
        <div className =  {styles.page} >
            <div className = {styles.cover} >
                <label> Application Status: {status.isApproved === true? 'Approved' : 'Rejected'} </label>
                <label htmlFor="">{status.isApproved === null && 'null'}</label>
                <label htmlFor=""></label>
            </div>
        </div>
    </>
)
}

export default Status