import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../headers/header.css'

function Header() {
    const navigate = useNavigate()
    const logout = () => {
        navigate('/admin/login')
    }
return (
    <div>
    <nav class="navbar">
        <div class="navbar-container container">
            <input type="checkbox" name="" id=""/>
            <div class="hamburger-lines">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </div>
            <ul class="menu-items">
                <li onClick={() => navigate('/admin/applications')} >Application</li>
                <li onClick={() => navigate('/admin/bookSlot')} >Booking Slot</li>
                <li onClick={() => navigate('/admin/clients')} >Clients</li>
                <li onClick={logout} >Logout</li>
            </ul>
            <h1 class="logo">Incubation</h1>
        </div>
    </nav>
    </div>
)
}

export default Header