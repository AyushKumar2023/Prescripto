import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function Navbar() {

  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const { token, setToken, userData } = useContext(AppContext)

  const navigateLogin = () => {
    navigate('/login')
    setShowMenu(false)
  }

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    setShowMenu(false)
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300 px-4'>

      {/* ================= LOGO ================= */}
      <img
        onClick={() => navigate('/')}
        className='w-36 md:w-44 cursor-pointer'
        src={assets.logo}
        alt="logo"
      />

      {/* ================= DESKTOP NAV ================= */}
      <ul className='hidden md:flex items-start gap-6 font-medium'>

        {[
          { name: "HOME", path: "/" },
          { name: "ALL DOCTORS", path: "/doctors" },
          { name: "ABOUT", path: "/about" },
          { name: "CONTACT", path: "/contact" },
        ].map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="relative"
          >
            {({ isActive }) => (
              <>
                <li className={`${isActive ? "text-[#5f6fff]" : "text-gray-600"}`}>
                  {item.name}
                </li>
                <span
                  className={`absolute left-1/2 -bottom-1 h-0.5 bg-[#5f6fff] transition-all duration-300
                    ${isActive ? "w-3/5 -translate-x-1/2" : "w-0"}`}
                />
              </>
            )}
          </NavLink>
        ))}

      </ul>

      {/* ================= RIGHT SECTION ================= */}
      <div className='flex items-center gap-4'>

        {/* Desktop Auth */}
        {token && userData ? (
          <div className='hidden md:flex items-center cursor-pointer group relative'>
            <img src={userData.image} className='w-8 rounded-full' alt="" />
            <img src={assets.dropdown_icon} className='w-2.5 ml-1' alt="" />

            <div className='absolute top-10 right-0 hidden group-hover:block z-20'>
              <div className='min-w-48 bg-stone-100 rounded-md shadow-md p-4 flex flex-col gap-3 text-gray-700'>
                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={navigateLogin}
            className='hidden md:block bg-[#5f6fff] text-white px-8 py-2 rounded-full'
          >
            Create Account
          </button>
        )}

        {/* Hamburger */}
        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden cursor-pointer'
          src={assets.menu_icon}
          alt=""
        />
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div className={`${showMenu ? "fixed inset-0" : "hidden"} md:hidden bg-white z-50`}>

        {/* Top */}
        <div className='flex items-center justify-between px-5 py-5 border-b'>
          <img className='w-32' src={assets.logo} alt="" />
          <img
            onClick={() => setShowMenu(false)}
            className='w-6 cursor-pointer'
            src={assets.cross_icon}
            alt=""
          />
        </div>

        {/* Mobile Nav */}
        <ul className='flex flex-col items-center gap-4 mt-8 text-lg font-medium'>
          {[
            { name: "HOME", path: "/" },
            { name: "ALL DOCTORS", path: "/doctors" },
            { name: "ABOUT", path: "/about" },
            { name: "CONTACT", path: "/contact" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `px-8 py-2 rounded-full transition
                 ${isActive ? "bg-[#5f6fff] text-white" : "text-gray-700"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </ul>

        {/* Mobile Auth */}
        <div className='mt-10 px-6'>
          {token && userData ? (
            <div className='flex flex-col gap-4'>
              <button onClick={() => navigate('/my-profile')} className='border py-2 rounded'>My Profile</button>
              <button onClick={() => navigate('/my-appointments')} className='border py-2 rounded'>My Appointments</button>
              <button onClick={logout} className='bg-red-500 text-white py-2 rounded'>Logout</button>
            </div>
          ) : (
            <button
              onClick={navigateLogin}
              className='w-full bg-[#5f6fff] text-white py-3 rounded-full text-lg'
            >
              Create Account
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default Navbar
