import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <div className='bg-black min-h-screen text-white px-9 py-3'>
        <Navbar/>
            <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout