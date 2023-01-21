import React , {useState  , useEffect} from 'react'
import {Axios} from '../../instance'
import Navbar from './headers/header'
import './Applications/Applications.css'
function UsersList() {
    const [state , setState] = useState([])
    const [block , setBlock] = useState(false)

    useEffect(() => {
        Axios.get('/admin/getUsers').then((response) => {
            console.log(response.data)
            setState(response.data)
        })
    } , [block])

    const blockUser = (id) =>{
        console.log(id)
        Axios.patch(`/admin/blockUser/${id}`).then(({data}) => {
            console.log(data)
            setBlock(!block)
        })
    }

    const unBlockUser = (id) => {
        console.log(id)
        Axios.patch(`/admin/unBlockUser/${id}`).then(({data}) => {
            console.log(data)
            setBlock(!block)
        })
    }

return (
    <div className="row" style={{ height: "100vh" }}>
        <Navbar />
    <div className="col-md-2">
        {/* <h1>User Management</h1> */}
    </div>
    <div >
        <table >
        <thead>
            <tr>
            <th >No</th>
            <th >Name</th>
            <th >Email</th>
            <th >Options</th>
            </tr>
        </thead>
        <tbody>
            {state.map((data, i) => {
            return (
                <tr>
                <th scope="row">{i + 1}</th>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>
                    {data.isBlocked === false ? (
                    <button
                        type="button"
                        onClick={() => blockUser(data._id)}
                        class="btn btn-primary"
                    >
                        UNBLOCK
                    </button>
                    ) : (
                    <button
                        type="button"
                        onClick={() => unBlockUser(data._id)}
                        class="btn btn-secondary"
                    >
                        BLOCK
                    </button>
                    )}
                </td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </div>
    </div>
)
}

export default UsersList