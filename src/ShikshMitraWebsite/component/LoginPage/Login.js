import React, { useEffect, useState } from "react";
import "./LoginCss.css";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import Dropdown from "./Dropdown";
import Cookies from "js-cookie";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loading, setLoading] = useState(false);
    
  const [isClosed, setIsClosed] = useState(true);
  const [formdata, setformdata] = useState({
    Username: "",
    Password: "",
    Role: "admin",
  });

  const { setisLoggedIn } = useStateContext();
  const Navigate = useNavigate();

  function onclickHandler(event) {
    setformdata((prevdata) => {
      return {
        ...prevdata,
        [event.target.name]: event.target.value,
      };
    });
  }
  function submitHandler(e) {
    setTimeout(()=>{
      setIsClosed(true)
    },1000)
    e.preventDefault();
    setLoading(true);

    const loginobj = {
      email: formdata.Username,
      password: formdata.Password,
      role: formdata.Role,
    };
    sessionStorage.setItem("userRole", formdata.Role);
    axios
      .post(
        "https://average-red-kimono.cyclic.app/api/v1/login",
        loginobj
      )
      .then((response) => {
        setisLoggedIn(formdata.Role);
        Cookies.set("token", response?.data?.token, { expires: 7 });

        const fullName = response.data.user.fullName;
        const image = response.data.user.image.url;
        const email = response.data.user.email;
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("image", image);
        localStorage.setItem("email", email);
        localStorage.setItem("response", JSON.stringify(response.data.user));
        const token = response.data.token;
        document.cookie = `token=${token}; path=/; max-age=3600`;
        showSuccessToast("Login successful!!!");
        Navigate(`/${formdata.Role}`);
      })
      .catch((error) => {
     
        setLoading(false); // Stop the loading spinner
        showErrorToast("Login failed. Please check your credentials.");
        setIsClosed(false)
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const showErrorToast = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Auto-close the notification after 3 seconds
      style: { marginTop: "50px" }, // Add margin-top
    });
  };
  const showSuccessToast = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      style: { marginTop: "50px" },
    });
  };





  const handleClick = () => {
    setIsClosed(!isClosed);
  };
  useEffect(()=>{
    setTimeout(()=>{
      setIsClosed(false)
    },1000)
  },[])
  return (
    <>
      {loading && <Spinner />}
      {
          <div className="bg-[#1f2937] h-screen flex justify-center items-center">
            <div className="laptop js-laptop ">
          <div className="laptop-top">
          
            <div className={`${isClosed ? 'laptop--closed' : ''}`}>
            <div className="laptop__screen">
         
               <div className="py-5 md:px-10 px-5 ">
            <form onSubmit={submitHandler} className="space-y-2 md:px-20">
              <Dropdown formdata={formdata} setformdata={setformdata} />

                <input
                 className="rounded-md  bg-[#000102a1] text-white border-2 border-white w-full py-2 outline-none  px-3"
                  required
                  type="text"
                  name="Username"
                  id="Username"
                  placeholder="User Name"
                  value={formdata.Username}
                  onChange={onclickHandler}
                />
               

                <input
                 className="rounded-md  bg-[#000102a1] text-white border-2 border-white w-full py-2 outline-none  px-3"
                  required
                  placeholder="Password"
                  type="password"
                  name="Password"
                  id="Password"
                  value={formdata.Password}
                  onChange={onclickHandler}
                />
              
              <input type="submit"  className="rounded-md w-full py-2 text-white cursor-pointer outline-none border-none px-3 bg-cyan-700" />
            </form>
          </div>
          </div>
            </div>
            
          </div>
          <div className="laptop__base cursor-pointer"  onClick={handleClick} ></div>
        </div>
          </div>
    
        // <div className="login_body">
        //   <div className="box">
        //     <form onSubmit={submitHandler}>
        //       <Dropdown formdata={formdata} setformdata={setformdata} />
        //       <div className="inputBox pt-2 rounded-md">
        //         <input
        //           className="rounded-md "
        //           required
        //           type="text"
        //           name="Username"
        //           id="Username"
        //           value={formdata.Username}
        //           onChange={onclickHandler}
        //         />
        //         <label htmlFor="Username">User Name</label>
        //       </div>
        //       <div className="inputBox  rounded-md pt-2">
        //         <input
        //           className="rounded-md "
        //           required
        //           type="password"
        //           name="Password"
        //           id="Password"
        //           value={formdata.Password}
        //           onChange={onclickHandler}
        //         />
        //         <label htmlFor="Password">Password</label>
        //       </div>
        //       {/* <Dropdown /> */}

        //       <hr />
        //       <input type="submit" className="p-2 w-100" />
        //     </form>
        //   </div>
        // </div>
      }
    </>
  );
}

export default Login;


// import {React,useState} from 'react'
// import './checkform.css'
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';



//   // TODO remove, this demo shouldn't need to reset the theme.

// // const defaultTheme = createTheme();

// function Checkform() {


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//    const donothing = ()=>{
//         console.log("Do nothing ")
//   }

//   return (
//     <div className="laptop js-laptop">
//         <div className="laptop-top">
//           <div className="laptop__lid"></div>
//           <div className={`laptop ${isClosed ? 'laptop--closed' : ''}`} onClick={handleClick} >
//           <div className="laptop__screen">
           
         
//             <div className="happy-face">
//                 :<span className="happy-face__mouth">)</span>
//             </div>
//         </div>
//           </div>
          
//         </div>
//         <div className="laptop__base"></div>
//       </div>
//   )
// }

// export default Checkform


// import React, { useState } from "react";
// import "./LoginCss.css";
// import { useNavigate } from "react-router-dom";
// import { useStateContext } from "../../../contexts/ContextProvider";
// import axios from "axios";
// import Dropdown from "./Dropdown";
// import Cookies from "js-cookie";
// import Spinner from "./Spinner";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Login() {
//   const [loading, setLoading] = useState(false);
//   const [formdata, setformdata] = useState({
//     Username: "",
//     Password: "",
//     Role: "admin",
//   });

//   const { setisLoggedIn } = useStateContext();
//   const Navigate = useNavigate();

//   function onclickHandler(event) {
//     setformdata((prevdata) => {
//       return {
//         ...prevdata,
//         [event.target.name]: event.target.value,
//       };
//     });
//   }
//   function submitHandler(e) {
//     e.preventDefault();
//     setLoading(true);

//     const loginobj = {
//       email: formdata.Username,
//       password: formdata.Password,
//       role: formdata.Role,
//     };
//     sessionStorage.setItem("userRole", formdata.Role);
//     axios
//       .post(
//         "https://average-red-kimono.cyclic.app/api/v1/login",
//         loginobj
//       )
//       .then((response) => {
//         setisLoggedIn(formdata.Role);
//         Cookies.set("token", response?.data?.token, { expires: 7 });

//         const fullName = response.data.user.fullName;
//         const image = response.data.user.image.url;
//         const email = response.data.user.email;
//         localStorage.setItem("fullName", fullName);
//         localStorage.setItem("image", image);
//         localStorage.setItem("email", email);
//         localStorage.setItem("response", JSON.stringify(response.data.user));
//         const token = response.data.token;
//         document.cookie = `token=${token}; path=/; max-age=3600`;
//         showSuccessToast("Login successful!!!");
//         Navigate(`/${formdata.Role}`);
//       })
//       .catch((error) => {
//         console.log("error", error.stack);
//         setLoading(false); // Stop the loading spinner
//         showErrorToast("Login failed. Please check your credentials.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }
//   const showErrorToast = (message) => {
//     toast.error(message, {
//       position: toast.POSITION.TOP_RIGHT,
//       autoClose: 3000, // Auto-close the notification after 3 seconds
//       style: { marginTop: "50px" }, // Add margin-top
//     });
//   };
//   const showSuccessToast = (message) => {
//     toast.success(message, {
//       position: toast.POSITION.TOP_RIGHT,
//       autoClose: 3000,
//       style: { marginTop: "50px" },
//     });
//   };

//   return (
//     <>
//       {loading && <Spinner />}
//       {
//         <div className="login_body">
//           <div className="box">
//             <form onSubmit={submitHandler}>
//               <Dropdown formdata={formdata} setformdata={setformdata} />
//               <div className="inputBox pt-2 rounded-md">
//                 <input
//                   className="rounded-md "
//                   required
//                   type="text"
//                   name="Username"
//                   id="Username"
//                   value={formdata.Username}
//                   onChange={onclickHandler}
//                 />
//                 <label htmlFor="Username">User Name</label>
//               </div>
//               <div className="inputBox  rounded-md pt-2">
//                 <input
//                   className="rounded-md "
//                   required
//                   type="password"
//                   name="Password"
//                   id="Password"
//                   value={formdata.Password}
//                   onChange={onclickHandler}
//                 />
//                 <label htmlFor="Password">Password</label>
//               </div>
//               {/* <Dropdown /> */}

//               <hr />
//               <input type="submit" className="p-2 w-100" />
//             </form>
//           </div>
//         </div>
//       }
//     </>
//   );
// }

// export default Login;
