import React , {useState , useEffect} from 'react'
import Navbar from './headers/header'
import {Axios} from '../../instance'
import '../../stylesheets/bookslot.css'
import Modal from './Modal'
import jwt_decode from 'jwt-decode'
import { useCookies } from 'react-cookie'
function BookSlot() {
    // const [info , setInfo] = useState() 
    let [slots, setSlots] = useState({
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        H: [],
    });
    const [cookies] = useCookies([])
    const [choosedSlot, setChoosedSlot] = useState({});
    const [show , setShow] = useState(false)
    const [appCompany , setAppCompany] = useState([])
    const [selectSlot, setSelectSlot] = useState();

    const getSlots = () => {
        Axios.get('/admin/getSlot').then((response) => {
            console.log(response.data)
            setSlots(response.data[0])
        })
    }

    const getCompany = () => {
        Axios.get('/admin/approvedCompany').then((response) => {
            console.log('Company' , response.data)
            setAppCompany(response.data)
        })
    }
    const handleClose = () => setShow(false)
    const handleShow = () => {setShow(true)}

    const bookSeat = (slotName , index) => {
        setChoosedSlot({slotName:slotName , position:index})
        handleShow()
    }
    
    const setCompany = async (details) => {
        console.log(details);
        const {company_name,_id} = details
        const token = cookies.jwt
        const decoded = await jwt_decode(token)
        let userId = decoded.id
        
        Axios.post('/admin/bookSlot',{company_name,choosedSlot,_id, userId}).then((response) => {
            console.log(response.data);
        })
    }   

    useEffect(() => {
        getSlots();
        getCompany()
    } , [slots.isAlloted]) 
  return (
    <>
        <div className="row" style={{ height: "100vh" }}>
          <Navbar />
        <div className="col-md-2">
        </div>
        <div className="col-md-10">
          <h1>Book Slots</h1>
          <div className="d-flex ">
            <div className="d-flex mb-3 flex-fill text-center">
              {slots?.A?.map((slotItem, index) => {
                return (
                  <div
                    onClick={() =>
                    //   setChoosedSlot({ slotName: "A", position: index })
                    bookSeat('A',index)
                    
                    }
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    key={index}
                    className="p-2 flex-fill text-white m-1"
                    style={{
                      height: "120px",
                      width: "50px",
                      background: (slotItem.company && "red") || "green",
                    }}
                  >
                    <p>{slotItem.company || "Add new company"}</p>
                  </div>
                );
              })}
            </div>

            <div className=" m-1" style={{ width: "15px" }}></div>
            <div className="d-flex mb-3 flex-fill text-center align-middle">
              {slots.B.map((slotItem, index) => {
                return (
                  <div
                    data-bs-toggle="modal"
                    onClick={() =>
                    //   setChoosedSlot({ slotName: "B", position: index })
                    bookSeat('B',index)
                    }
                    data-bs-target="#staticBackdrop"
                    key={index}
                    className="p-2 flex-fill text-white m-1"
                    style={{
                      height: "120px",
                      width: "50px",
                      background: (slotItem.company && " red") || "green",
                    }}
                  >
                    <p>{slotItem.company || "Add new company"}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" m-1" style={{ width: "100%", height: "8px" }}></div>
          <div className="d-flex ">
            <div className="d-flex mb-3 flex-fill text-center">
              {slots.D.map((slotItem, index) => {
                return (
                  <div
                    onClick={() =>
                    //   setChoosedSlot({ slotName: "D", position: index })
                    bookSeat('D',index)
                    }
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    key={index}
                    className="p-2 flex-fill text-white m-1"
                    style={{
                      height: "120px",
                      width: "50px",
                      background: (slotItem.company && "#5C8C46") || "green",
                    }}
                  >
                    <p>{slotItem.company || "Add new company"}</p>
                  </div>
                );
              })}
            </div>
            <div className=" m-1" style={{ width: "15px" }}></div>
            <div className="d-flex mb-3 flex-fill text-center align-middle">
              {slots.C.map((slotItem, index) => {
                return (
                  <div
                    onClick={() =>
                    //   setChoosedSlot({ slotName: "C", position: index })
                    bookSeat('C',index)
                    }
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    key={index}
                    className="p-2 flex-fill text-white m-1"
                    style={{
                      height: "120px",
                      width: "50px",
                      background: (slotItem.company && "#5C8C46") || "green",
                    }}
                  >
                    <p>{slotItem.company || "Add new company  "}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      <Modal  show={show} handleClose = {handleClose} companies = {appCompany} setCompany = {setCompany} />
    </>
  )
}

export default BookSlot