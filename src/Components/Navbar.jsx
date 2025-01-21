import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { active } from '../Context/context'
import Cookies from "js-cookie"
const Navbar = () => {
  const navigate = useNavigate();
  const { setloginbtn, loginbtn, setmyproduct } = useContext(active);


  const logout = (e) => {
    e.preventDefault();
    Cookies.remove('token');
    setloginbtn(true);
    navigate('/');
  }
  return (
    <nav className="flex justify-center h-20 bg-[#3b5d50]">
      <div className="w-[90rem] p-10 px-[6vw] flex justify-between items-center">
        <div>
          <Link
            className='text-4xl font-bold text-white after:content-["."] after:text-slate-400'
            to="/"
          >
            E<span className="text-slate-400">-</span>com
          </Link>
          <p className='text-white text-sm w-full text-end'>Seller</p>
        </div>
        <div className="flex gap-10">
          <div>
            <Link to="/" className="text-gray-400 text-[19px] font-semibold hover:text-white focus:text-white" id="link">
              Home
            </Link>
          </div>
          {!loginbtn &&
            <div className='flex gap-10'>

              <div>
                <Link to="/addproduct" className="text-gray-400 text-[19px] font-semibold hover:text-white focus:text-white" id="link">
                  Add Product
                </Link>
              </div>
              <div>
                <Link to="/myproduct" className="text-gray-400 text-[19px] font-semibold hover:text-white focus:text-white" id="link" >
                  My Product
                </Link>
              </div>
            </div>

          }
          {loginbtn ?
            <div>
              <Link
                to="/login"
                id="link"
                className="text-gray-400 text-[19px] font-semibold hover:text-white focus:text-white"

              >
                Login
              </Link>
            </div> :
            <div className='flex gap-10'>
              <div>
                <Link
                  to="/profile"
                  id="link"
                  className="text-gray-400 text-[19px] font-semibold hover:text-white focus:text-white"
                >
                  Profile
                </Link>
              </div>
              <div>
                <Link
                  to="/profile"
                  id="link"
                  className="text-gray-400 text-[19px] font-semibold hover:text-white focus:text-white"
                  onClick={logout}
                >
                  Logout
                </Link>
              </div>
            </div>

          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar