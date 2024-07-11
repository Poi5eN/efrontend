import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useStateContext} from "../../contexts/ContextProvider.js"
import axios from 'axios';
import Cookies from "js-cookie";
const authToken = Cookies.get("token");
const RegistrationForm = () => {
    const navigate=useNavigate()
    const{ currentColor}=useStateContext()
    const [submitData,setSubmitData]=useState([])
    const intialData={
        studentFullName: "",
        guardianName: "",
        studentEmail: "",
        studentAddress: "",
        mobileNumber: "",
        registerClass: "Nursery",
        gender: "Male",
        amount: "0",
      }
    const [formData, setFormData] = useState(intialData);
      const classes = [
        "Nursery",
        "UKG",
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
        "Class 5",
        "Class 6",
        "Class 7",
        "Class 8",
        "Class 9",
        "Class 10",
        "Class 11",
        "Class 12",
      ];
  const postData=async()=>{
  try {
    await axios.post("/api/api/v1/adminRoute/createRegistration",formData,{
        withCredentials:true,
        headers: {
            Authorization:`Bearer ${authToken}`
        }
    })
    .then((response)=>{
        console.log("Created successfully!",response )
        navigate("/admin/newregistration");
        setSubmitData(intialData)
    }
    )
    .catch((error)=>console.log(error))
  } catch (error) {
    
  }
  }
      
    const handleChange=(e)=>{
       const {name,value}=e.target;
       setFormData({...formData,[name]:value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        postData()
        setSubmitData(intialData)
      
    }
  return (
    <>
     <div className='md:h-screen'>
     <Link
        to="/admin/newregistration"
        className="dark:text-white dark:bg-secondary-dark-bg text-gray-800  neu-btn border-2 "
        style={{ border: `2px solid ${currentColor} `, color: currentColor }}
      >
        Back
      </Link>
      <h1
        className="text-2xl font-bold mb-4 uppercase text-center  hover-text "
        style={{ color: currentColor }}
      >
        Registration Form
      </h1>
      <div className=" bg-gray-50 flex dark:text-white dark:bg-secondary-dark-bg items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded dark:text-white dark:bg-secondary-dark-bg shadow-lg p-4 px-4 mb-6"
          >
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 ">
              <div className="lg:col-span-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6 ">
                  <div className="md:col-span-3 ">
                    <label htmlFor="studentFullName">Full Name</label>
                    <input
                      type="text"
                      name="studentFullName"
                      id="studentFullName"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:text-white dark:bg-secondary-dark-bg"
                      value={formData.studentFullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor="fatherName">Guardian's Name</label>
                    <input
                      type="text"
                      name="guardianName"
                      id="guardianName"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:text-white dark:bg-secondary-dark-bg"
                      value={formData.guardianName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-6">
                    <label htmlFor="studentEmail">Email Address</label>
                    <input
                      type="email"
                      name="studentEmail"
                      id="studentEmail"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:text-white dark:bg-secondary-dark-bg"
                      value={formData.studentEmail}
                      onChange={handleChange}
                      placeholder="email@domain.com"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor="studentAddress">Address / Street</label>
                    <input
                      type="text"
                      name="studentAddress"
                      id="studentAddress"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:text-white dark:bg-secondary-dark-bg"
                      value={formData.studentAddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor="mobileNumber">Mobile</label>
                    <input
                      type="number"
                      name="mobileNumber"
                      id="mobileNumber"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:text-white dark:bg-secondary-dark-bg"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="md:col-span-3">
                    <label htmlFor='registerClass'>Class</label>
                    <select
                     name="registerClass"
                     id="registerClass"
                     className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:text-white dark:bg-secondary-dark-bg"
                     value={formData.registerClass}
                      onChange={handleChange}
                    >
                       {classes.map((className) => (
                        <option key={className} value={className}
                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:text-white dark:bg-secondary-dark-bg"
                        //  style={{backgroundColor:"red", hoverbackgroundColor:"green"}}
                        >
                          {className}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor="gender">Gender</label>
                    <div className="flex items-center mt-1">
                      <label className="mr-4">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Male
                      </label>
                      <label className="mr-4">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Female
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Other"
                          checked={formData.gender === "Other"}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Other
                      </label>
                    </div>
                    <div className="md:col-span-3">
                    <label htmlFor="mobileNumber">Amount</label>
                    <input
                      type="amount"
                      name="amount"
                      id="amount"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:text-white dark:bg-secondary-dark-bg"
                      value={formData.amount}
                      onChange={handleChange}
                    />
                  </div>
                  </div>
                  <div className="md:col-span-6 text-right mt-3">
                    <div className="inline-flex items-end gap-2">
                      <button
                        type="submit"
                        className="dark:text-white dark:bg-secondary-dark-bg text-gray-800  neu-btn border-2 "
                        style={{
                          border: `2px solid ${currentColor} `,
                          color: currentColor,
                        }}
                      >
                        Submit
                      </button>
                      <Link
                        to="/admin/newregistration"
                        className="dark:text-white dark:bg-secondary-dark-bg text-gray-800 bg-gray-500  neu-btn border-2 "
                        style={{
                          border: `2px solid ${currentColor} `,
                          color: currentColor,
                        }}
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
     </div>
    </>
  )
}

export default RegistrationForm