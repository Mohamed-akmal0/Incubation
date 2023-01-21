import React , {useState , useEffect} from 'react'
import {Axios} from '../../instance'
import { useNavigate} from 'react-router-dom'
import {ToastContainer , toast} from 'react-toastify'
import styles from  '../../stylesheets/login.module.css'

function AdminLog() {
    const navigate = useNavigate()
    const [formValues , setFormValues] = useState({email : "" , password : ""})
    const [formErrors , setFormErrors] = useState({})
    const [isSubmit , setIsSubmit] = useState(false)

    const handleSubmit = (e) => {
        console.log('inside admin login handle submit function')
        e.preventDefault()
        setFormErrors((validate(formValues)))
        setIsSubmit(true)
    }
    useEffect(() => {
        console.log(formErrors)
        if(Object.keys(formErrors).length === 0 && isSubmit){
            Axios.post('/admin/login' , {
                email : formValues.email,
                password : formValues.password
            } , {
                withCredentials : true
            }).then((response) => {
                if(response.data === 'Email not found' || response.data === 'Password is wrong'){
                    generateError(response.data)
                }else{
                    console.log('else case under admin login')
                    navigate('/admin/clients')
                }
            })
        }
    } , [formErrors] )
    const handleChange = (e) => {
        const {name , value} = e.target
        setFormValues({...formValues , [name] : value})
    }

    const generateError = (err) => toast.error( err , { position : 'top-center'  ,theme : 'dark'} )

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
        errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
        const error = "This is not a valid email format!";
        generateError(error);
        }
        if (!values.password) {
        errors.password = "Password is required";
        } else if (values.password.length < 3) {
        errors.password = "Password must be more than 3 characters";
        } else if (values.password.length > 10) {
        errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };
return (
    <div className={styles.page}>
    <div className={styles.cover}>
        <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
            <div className={styles}>
            <label>Email</label>
            <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
            />
            </div>
            <p>{formErrors.email}</p>
            <div className={styles}>
            <label>Password</label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
            />
            </div>
            <p>{formErrors.password}</p>
            <button className={styles.login_btn}>Submit</button>
        </div>
        </form>
        <ToastContainer />
    </div>
    </div>
)
}

export default AdminLog