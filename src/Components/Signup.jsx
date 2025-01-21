import React, { useContext, useState } from 'react'

import { Link,useNavigate } from 'react-router-dom';


const Signup = () => {

  const [pwd, setpwd] = useState('');
  const [confirmpwd, setconsfirmpwd] = useState('');
  const [finalpwd, setfinalpwd] = useState('');
  const [err, seterr] = useState('');
  const [email, setemail] = useState('');
  const [userid, setuserid] = useState('');
  const [name, setname] = useState('');
  const navigate = useNavigate();
  const createAccount = async (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: finalpwd,
      username: userid
    }
    console.log(userData);
    await fetch('https://backend-onlineshoppingwebsite-mern-stack.onrender.com/seller/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON format
      },
      body: JSON.stringify(userData)
    })  // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        navigate('/login');
        console.log(data);
      })
      .catch(err => {
        alert(err);// Set loading to false    // Handle any error that occurs during the fetch
      });
  }
  const checkpwd = (pd, compd) => {
    if (pd !== compd) seterr("comfirm password must be same")
    else {
      seterr("");
      setfinalpwd(pd);
    }


  }
  return (
    <nav className='flex justify-center w-screen h-screen ' >
      <div className='w-[100rem]  px-[6vw] flex justify-between relative'>
        <div className='absolute mt-[7vh]' >
          <Link className='text-4xl font-bold text-[#3b5d50] after:content-["."] after:text-slate-400 ' to="/"  >E<span className="text-slate-400">-</span>com</Link>
          <p className='text-black text-sm w-full text-end'>Seller</p>
        </div>
        <div className='flex justify-center w-full'>

          <div className='flex flex-col justify-center items-center w-[100%] h-[95%]'>
            <div className='w-fit'>
              <h1 className='text-2xl font-medium w-full text-center'>Create Account</h1> <br />
              <Link className='p-1 flex w-32 mx-auto border-[1px] justify-center gap-2 items-center border-gray-300 text-lg mb-2 hover:bg-gray-800 hover:text-white transition-all duration-200 ease '>
                <h1 className=''>Google</h1>
              </Link>
              <p className='w-full text-center text-sm'>or</p>

              <form action="" className=' flex flex-col justify-center gap-3' onSubmit={createAccount}>
                <label htmlFor="" className='text-sm'>Name</label>
                <input
                  type="text"
                  className='h-8 w-[350px] bg-transparent border-black border-[1px] placeholder-slate-400 py-auto pl-2 text-sm'
                  placeholder='ex- Sandip Suthar'
                  onChange={(e) => setname(e.target.value)}
                  required />
                <label htmlFor="" className='text-sm'>UserID</label>
                <input
                  type="text"
                  className='h-8 w-[350px]  bg-transparent border-black border-[1px] placeholder-slate-400 py-auto pl-2 text-sm'
                  placeholder='ex- user@25'
                  onChange={(e) => setuserid(e.target.value)}
                  required />
                <label htmlFor="" className='text-sm'>Email</label>
                <input
                  type="email"
                  className='h-8 w-[350px]  bg-transparent border-black border-[1px] placeholder-slate-400 py-auto pl-2 text-sm'
                  placeholder='ex-your@email.com'
                  onChange={(e) => setemail(e.target.value)}
                  required />
                <label htmlFor="" className='text-sm'>Password</label>
                <input
                  type="password"
                  className='h-8 w-[350px]  bg-transparent border-black border-[1px] placeholder-slate-400 py-auto pl-2 text-sm'
                  placeholder='ex-keyname@365'
                  onChange={(e) => { setpwd(e.target.value) }}
                  required />
                <label htmlFor="" className='text-sm'>Confirm Password</label>
                <input
                  type="password"
                  className='h-8 w-[350px]  bg-transparent border-black border-[1px] placeholder-slate-400 py-auto pl-2 text-sm'
                  onChange={(e) => { setconsfirmpwd(e.target.value); checkpwd(e.target.value, pwd) }}
                  required />
                <p className='text-red-500 mb-2 text-sm'>{err}</p> {/* Placeholder for error */}
                <button className='w-fit p-5 py-2 border-gray-400 text-md mb-2 hover:bg-gray-800 hover:text-white transition-all duration-200 ease   bg-slate-300' type='submit'>
                  Create Account
                </button>
              </form>
              <div className='flex my-[3px] mt-6'>
                <p >By signing up you agree to our.</p>
                <a href="#" className='text-indigo-700 underline hover:bg-indigo-100 text-sm'>
                  terms of service.
                </a>
              </div>
              <div className='flex'>
                <p >Already have an account? </p>
                <Link to="/login" className='text-indigo-700 underline hover:bg-indigo-100 text-sm'>
                  Sign in
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>


    </nav>
  )
}

export default Signup