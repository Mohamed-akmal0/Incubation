import React , {useEffect} from 'react'
import logS from '../stylesheets/login.module.css'
import {useNavigate } from 'react-router-dom'
import {ToastContainer , toast} from 'react-toastify'
import {useCookies} from 'react-cookie'
import {Axios} from '../instance'
function Home() {
  const navigate = useNavigate()
  const [cookies , setCookies , removeCookies] = useCookies([])



  useEffect(() => {
    const verifyUser = async () => {
      if(!cookies.jwt){
        navigate('/login')
      }else{
        const {data} = await Axios.post('/user',{},{withCredentials : true});
        if(!data.status){
          removeCookies('jwt')
          navigate('/login')
        }else toast(`Hi ${data.user} ` , {theme : 'dark'})
      }
    }
    verifyUser()
  } , [cookies , navigate , removeCookies]);



  const logout = () => {
    removeCookies('jwt')
    navigate('/login')
  }



  const apply = () => {
    navigate('/application')
  }



  return (
    <div className={logS.page}>
      <div className={logS.cover}>
      <div onClick={apply}  className={logS.login_btn} >Apply</div>
      <div onClick={logout} className={logS.login_btn} >Logout</div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home