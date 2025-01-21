import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css'
import Navbar from './Components/Navbar'
import Signin from './Components/Signin'
import Signup from './Components/Signup'
import Homepage from './Components/Homepage'
import Showproduct from './Components/Showproduct';
import Addproduct from './Components/Addproduct';
import { active } from './Context/context';
import Editproduct from './Components/Editproduct';
import Productdetail from './Components/Productdetail';
function App() {
  const [myproduct, setmyproduct] = useState([]);
  const [loginbtn, setloginbtn] = useState(true);
  const [productdata,setproductData] = useState({});
  const [editproduct,seteditproduct] = useState({});
  return (
    <active.Provider value={{ loginbtn, setloginbtn, myproduct, setmyproduct ,productdata,setproductData}}>
      <Router>
        <AppContent editproduct={editproduct} seteditproduct={seteditproduct} />
      </Router>
    </active.Provider>
  );
}



function AppContent({editproduct,seteditproduct}) {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavFooterRoutes = ['/login', '/signup'];
  const { setmyproduct } = React.useContext(active)
  const { setloginbtn,loginbtn } = React.useContext(active);
  const hideNavFooter = hideNavFooterRoutes.includes(location.pathname);


  useEffect(() => {
    const fetchData = async () => {
      await profile(); // Await the Promise returned by profile()
      if (location.pathname == "/myproduct") {
        await searchmyproduct(); // Assuming searchmyproduct is an async function
      } 
      else if (location.pathname == "/addproduct") {
        //await profile(); // Await the Promise returned by profile()
        console.log(loginbtn);

        if (loginbtn == true) {
          navigate("/"); // Redirect to home if user is not found
        }
      }
    };

    fetchData(); // Call the asynchronous function
  }, [location, navigate]); // Add dependencies for useEffect


  const profile = () => {
    let status;
    const token = Cookies.get('token');
    fetch('https://backend-onlineshoppingwebsite-mern-stack.onrender.com/seller/',{
      method: "POST",
      headers: {
        "Authorization":`bearer ${token}`,
      },
    }
    )
    .then(response => response.json())
    .then(data => {
      // Set loading to false once data is fetched
      status = data.msg
      console.log(data.msg)
      if(data.msg == 'user not found') {
        setloginbtn(true);
      }
      else if(data.msg == 'seller is found') {
        setloginbtn(false);
      }
    })
    .catch(err => {
      // Set loading to false
      setError(err);       // Handle any error that occurs during the fetch
    });
    //return status;
  }
  const searchmyproduct = async () => {
    const token = Cookies.get('token');
    await fetch('https://backend-onlineshoppingwebsite-mern-stack.onrender.com/product/seller', {
      method: "post",
      headers: {
        "Content-Type": "application/json", // Specify JSON format
        "Authorization": `bearer ${token}`,
      }
    })  // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        // Set loading to false once data is fetched
        setmyproduct(data);  // Set the fetched data into state
      })
      .catch(err => {
        // Set loading to false      // Handle any error that occurs during the fetch
      });
  }
  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path='/login' element={<Signin />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/productdetail' element={<Productdetail />} />
        <Route path='/myproduct'  element={<Showproduct editproduct={editproduct} seteditproduct={seteditproduct}/>} />
        <Route path='/addproduct' element={<Addproduct />} />
        <Route path='/editproduct' element={<Editproduct editproduct={editproduct} seteditproduct={seteditproduct}/>}/>
      </Routes>
    </>
  );
}

export default App;
