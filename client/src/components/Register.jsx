import React , {useState} from 'react'
import {NavLink , useNavigate} from 'react-router-dom'
import {toast, ToastContainer   } from 'react-toastify'
import logStyle from '../stylesheets/login.module.css'
import {Axios} from  '../instance'
import '../stylesheets/register.css'
function Register() {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [values , setValues] = useState({
        username : "",
        email : "",
        password : ""
    })

    const generateError = (err) => toast.error(err,{
        position : 'top-center'
    })

    const  handleSubmit = async (e) => {
        e.preventDefault()
        console.log(values)
        setFormErrors(validate(values));
        try{
            const { data } = await Axios.post('/auth/signup' , {
                ...values
                // ...DATA
            },{
                withCredentials : true
            })
            console.log(data)
            if(data){
                if(data.errors){
                    const {email , password , username} = data.errors
                    if (email)  generateError(email)
                    else if (password) generateError(password)
                    else if (username) generateError(username)
                }else{
                    navigate('/login')
                }
            }
        }catch(err){
            console.log('api calling error' , err)
        }
    }

    const validate = (Values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!Values.username) {
          const errors = "Username is required!";
          generateError(errors)
        }
        if (!Values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(Values.email)) {
          errors.email = "This is not a valid email format!";
        }
        if (!Values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 4) {
          errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
          errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
      };
return (
    <> 
    <div className={logStyle.page}>
        <div className={logStyle.cover} >
        <h3> SignUp</h3>
        
            <input type="text" placeholder="username" 
            name="username"
            required
            onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
            
            />
            <br></br>
            
            <br></br>
            <input type="email" placeholder="Enter email"
            name= "email" 
            
            onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
            
            />
            <br></br>
            
            <br></br>

            <input type="password" placeholder="Password"

            name = "password"
            onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
            
            />
            <br></br>
            
            <br></br>
        <div className={logStyle.login_btn} onClick = {handleSubmit} >
            Submit
        </div>
        <p>Already have an account?
            <NavLink to='/login' >Click here</NavLink>
        </p>
        <ToastContainer/>
        </div>
    </div>
    </>




    // <>
    // <form onSubmit = {handleSubmit(onSubmit)} >
    // <div className={logStyle.page}>
    //     <div className={logStyle.cover} >
    //         <h3>SIGNUP</h3>

    //             <input type="text" name="username" id="" placeholder='username'  
    //             onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
    //             {...register("username", {
    //                 required: true,
    //                 minLength: 4,
    //                 maxLength: 20,
    //                 pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
    //             })}
    //             />
    //             <span className="error">
    //                 {errors.name?.type === "required" && (
    //                     <span>name is required</span>
    //                 )}
    //                 {errors.name?.type === "minLength" && (
    //                     <span>name must be minimum 4 Character</span>
    //                 )}
    //                 {errors.name?.type === "maxLength" && (
    //                     <span>name must less than 20 Character</span>
    //                 )}
    //                 {errors.name?.type === "pattern" && (
    //                     <span>Should not have spaces</span>
    //                 )}
    //             </span>
    //             <input type="text" name="email" id="" placeholder='email'  
    //             onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
    //             {...register("email", {
    //                 required: true,
    //                 // minLength: 4,
    //                 // maxLength: 20,
    //                 pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
    //                 })}
    //             />
    //             <span className="error">
    //                 {errors.name?.type === "required" && (
    //                     <span>email is required</span>
    //                 )}
    //                 {/* {errors.name?.type === "minLength" && (
    //                     <span>name must be minimum 4 Character</span>
    //                 )}
    //                 {errors.name?.type === "maxLength" && (
    //                     <span>name must less than 20 Character</span>
    //                 )} */}
    //                 {errors.name?.type === "pattern" && (
    //                     <span>Not a Valid Email Format</span>
    //                 )}
    //             </span>

    //             <input type="password" name="password" id="" placeholder='password' 
    //             onChange = {(e) => {setValues({...values , [e.target.name] : e.target.value})}}
    //             {...register("password", {
    //                 required: true,
    //                 minLength: 4,
    //                 maxLength: 20,
    //                 pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
    //                 })}
    //             />

    //             <span className="error">
    //                 {errors.name?.type === "required" && (
    //                     <span>name is required</span>
    //                 )}
    //                 {errors.name?.type === "minLength" && (
    //                     <span>name must be minimum 4 Character</span>
    //                 )}
    //                 {errors.name?.type === "maxLength" && (
    //                     <span>name must less than 20 Character</span>
    //                 )}
    //                 {errors.name?.type === "pattern" && (
    //                     <span>Should not have spaces</span>
    //                 )}
    //             </span>

    //             <div className={logStyle.login_btn}   type = 'submit' >SignUp</div>
    //             <p className={logStyle.text} >Already have account <NavLink to={'/login'} >Click here</NavLink></p>

    //         {/* <div className={popError} >
    //             <h3>Login failed</h3>
    //             <p>Email or password is incorrect </p>
    //         </div> */}
    //     </div>
    // </div>
    // </form>
    // <ToastContainer/>
    // </>
)
}

export default Register