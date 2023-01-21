import React, { useState } from 'react'
import {Modal , Button} from 'react-bootstrap'
function Modals({show, handleClose , companies , setCompany }) {
  const [company , setCompanyy] = useState({})

  const setSelectedApplication = (id) => {
    if(id === 'remove') {
      setCompanyy({company_name:null,id})
    } else {
      setCompanyy(prev => {
        return companies.filter((item) => item._id === id)[0]
      })
    }
    
  }
  return (
    <div>
       <Modal show={show} onHide={handleClose}> 
        <Modal.Header closeButton >
            <Modal.Title><strong>Select Company</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
        companies ?
        <select name="" id="" onChange={(e) => setSelectedApplication(e.target.value)}>
        <option value="remove">Select</option>
        {
            companies.map((application,index) => {
                const {company_name,_id} = application
                return  <option key={index} value={_id}
                >{company_name}</option>       
            })
        }
      </select>
      : <h2>No  applications</h2>
      }
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => {setCompany(company)
            handleClose()}} >Submit</Button>
        </Modal.Footer>
        </Modal> 
    </div>
  )
}

export default Modals