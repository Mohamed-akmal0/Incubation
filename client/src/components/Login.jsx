import React , {useState} from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import { ToastContainer , toast } from 'react-toastify'
import {Axios} from  '../instance'
import logStyle  from '../stylesheets/login.module.css'
function Login() {
    // const show_Pop = logStyle.show_Pop
    const navigate = useNavigate();
    const [values , setValues] = useState({
        email : "",
        password : ""
    })
    const generateError = (err) => toast.error(err,{
        position : 'top-center'
    })
    
    const  handleSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
        try{
            console.log('inside handle submit')
            const { data } = await Axios.post('/auth/login' , {
                ...values
            },{
                withCredentials : true
            })
            console.log(data)
            if(data){
                if(data.errors){
                    const {email , password } = data.errors
                    if (email)  generateError(email)
                    else if (password) generateError(password)
                }else{
                    navigate('/')
                }
            }
        }catch(err){
            console.log('api calling error' , err)
        }
    }
return (
    <>
    <div className={logStyle.page}>
    {/* <form onSubmit={handleSubmit} > */}
        <div className={logStyle.cover} >
            <h3>LOGIN</h3>
                <input type="text" name="email" id="" placeholder='email'  
                onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}} 
                />


                <input type="password" name="password" id="" placeholder='password' 
                onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
                />


                <div className={logStyle.login_btn}   onClick={handleSubmit} >Login</div>
                <p className={logStyle.text} >orCreate account <NavLink to={'/signup'} >Click here</NavLink></p>

            {/* <div className={popError} >
                <h3>Login failed</h3>
                <p>Email or password is incorrect </p>
            </div> */}
        </div>
    {/* </form> */}
    </div>
    <ToastContainer/>
    </>
)
}

export default Login