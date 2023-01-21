import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Login from './pages/Login'
import Register  from './pages/Register';
import Home from './pages/Home';
import Application from './pages/Application'
import AdminLogin from './pages/Admin/AdminLogin';
import Users from './pages/Admin/Users';
import Applications from './pages/Applications';
import Status from './pages/Status';
import BookSlots from './pages/Admin/BookSlots';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path='/signup' element = {<Register />} />
      <Route  path='/login' element = {<Login />} />
      <Route  path='/' element = {<Home />} />
      <Route path='/application' element = {<Application/>} />
      <Route path='/status' element = {<Status />} />
      <Route path='/admin/login' element = {<AdminLogin />} />
      <Route path='/admin/clients' element = {<Users />} />
      <Route path='/admin/applications' element = {<Applications />} />
      <Route path='/admin/bookSlot' element = {<BookSlots />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
