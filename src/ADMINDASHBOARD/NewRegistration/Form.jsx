import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const authToken = Cookies.get("token");
import { useStateContext } from "../../contexts/ContextProvider.js";
const Form = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentFullName: "",
    guardianName: "",
    studentEmail: "",
    studentAddress: "",
    mobileNumber: "",
    registerClass: "Nursery",
    gender: "Male",
    amount: "0",
  });

  const [submittedData, setSubmittedData] = useState([]); // Initialize submittedData

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/v1/adminRoute/createRegistration",
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData({
        studentFullName: "",
        guardianName: "",
        studentEmail: "",
        studentAddress: "",
        mobileNumber: "",
        registerClass: "Nursery",
        gender: "Male",
        amount:"0"
      });

      setSubmittedData([...submittedData, formData]);
      setLoading(false);
      toast.success("Student Created successfully!");
      setShouldFetchData(true);
      navigate("/admin/newregistration");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating a student.");
      setLoading(false);
    }
  };

  return (
    <>
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
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6 ">
                  <div className="md:col-span-3">
                    <label htmlFor="studentFullName">Full Name</label>
                    <input
                      type="text"
                      name="studentFullName"
                      id="studentFullName"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
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
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
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
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
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
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
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
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label htmlFor="registerClass">Class</label>
                    <select
                      name="registerClass"
                      id="registerClass"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      value={formData.registerClass}
                      onChange={handleChange}
                    >
                      {classes.map((className) => (
                        <option key={className} value={className}>
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
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
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
    </>
  );
};

export default Form;
