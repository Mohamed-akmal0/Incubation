import React, { useState } from "react";
import {Axios} from '../../instance'
function Approval({data}) {
  const [approves, setApproves] = useState(false);
  //reject  function
  const reject = (data) => {
      Axios.patch(`/admin/formReject/${data._id}`).then((response) => {
        console.log('inside reject function')
        console.log(response.data)
        setApproves(response.data)
      })
  }
  //approve function
  const approve = (data) => {
    Axios.patch(`/admin/formApprove/${data._id}`).then((response) => {
      console.log('inside approve function')
      console.log(response.data)
      setApproves(response.data)
      console.log('app fn' , approves)
    })
  }
    let conformation
    console.log('above if approves', approves)

    if(approves === true) {
        conformation = <p className='approve'> Approved </p>
    } else {
        conformation = <p className='reject'> Rejected </p>
    }
  return (
    <>
      {/* <td data-column="First Name" >
        {i + 1}
      </td> */}
      <td data-column="Last Name" >
        {data.company_name}
      </td>
      <td data-column="Job Title" >
        {data.Describe_Your_Company_And_Products}
      </td>
      <td data-column="Twitter">
        <button> Details</button>
      </td>
      <td data-column="Twitter">
        {data.isApproved === null ? (
          <label class="dropdown">
            <div class="dd-button">Status</div>
            <input type="checkbox" class="dd-input" id="test" />
            <ul class="dd-menu">
              <li onClick={() => approve(data)}>Approve</li>
              <li onClick={() => reject(data)}> Reject </li>
            </ul>
          </label>
        ) : (
          conformation
        )}
      </td>
    </>
  );
}

export default Approval;
