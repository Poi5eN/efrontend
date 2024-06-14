import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
const authToken = Cookies.get('token');

const EditAdmission = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    // studentEmail: "",
    // studentPassword: "",
    dateOfBirth: "",
    rollNo: "",
    gender: "",
    joiningDate: "",
    address: "",
    contact: "",
    class: "",
    section: "",
    country: "",
    subject: "",
    // fatherName: "",
    // motherName: "",
    // parentEmail: "",
    // parentPassword: "",
    // parentContact: "",
    image: null,
    // parentImage: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("File:", file); // Check if 'file' is not undefined
    if (file) {
      console.log("Updating studentImage with file:", file);
      setFormData({
        ...formData,
        image: file,
      });
      console.log(formData)
    }
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/v1/adminRoute/getAllStudents?email=${email}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      .then((response) => {
        const data = response.data.allStudent[0];
        console.log(data)
        setStudentData(data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // const data = new FormData();
    // console.log(formData);
    // if (formData.studentImage instanceof File) {
    //   data.append('image', formData.studentImage);
    //   // Use 'image' as the key
    //   console.log(data)
    // }

    // // Append the rest of the form data to the FormData
    // for (const key in formData) {
    //   if (key !== 'studentImage' && formData.hasOwnProperty(key)) {
    //     data.append(key, formData[key]);
    //   }
    // }
    // data.append('studentEmail', email);

    const data = new FormData();
  
    // Exclude image from formData
    const { image, ...formDataWithoutImage } = formData;
  
    // Append other form data to the FormData
    for (const key in formDataWithoutImage) {
      data.append(key, formDataWithoutImage[key]);
    }
  
    // Append image as a separate file
    // if (image && typeof image === 'object' && image instanceof File) {
    //   data.append("image", image);
    // }

    if (image  && image instanceof File) {
      data.append("image", image);
    }

    axios.put(`http://localhost:4000/api/v1/adminRoute/updateStudent`, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log("Student data updated successfully", response);
        navigate("/admin/registration");
      })
      .catch((error) => {
        console.error("Error updating student data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (

    <div style={{ textAlign: "center", padding: "20px", }}>
      <h1 style={{ fontSize: "30px", fontWeight: "900" }}>Edit Student</h1>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <Box className="py-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4 bg-white rounded-md shadow-lg">
          <TextField
            label="Full Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom: "20px" }}
          />
          <TextField
            label="RollNo"
            name="rollNo"
            type="text"
            value={formData.rollNo}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom: "20px" }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleOnChange}
            required
            InputProps={{
              readOnly: true,
            }}
            style={{ width: "70%", paddingBottom: "20px" }}
          />
          <TextField
            label="DateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : ''}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom: "20px" }}
          />
          <TextField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom: "20px" }}
          />
          <TextField
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom: "20px" }}
          />
          <TextField
            label="Joining Date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom: "20px" }}
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom: "20px" }}
          />
          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom: "20px" }}
          />
          <TextField
            label="Contact"
            name="contact"
            value={formData.contact}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom: "20px" }}
          />
          <TextField
            label="Class"
            name="class"
            value={formData.class}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom: "20px" }}
          />
          <TextField
            label="Section"
            name="section"
            value={formData.section}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom: "20px" }}
          />
          <TextField
            label="Student Image"
            name="image"
            type="file"
            accept="image/*"
            required
            onChange={handleImageChange}
            style={{ width: "70%", paddingBottom: "20px" }}
          />
        </Box>
        <Link to="/admin/registration">
          <div className="button flex w-full" style={{ marginTop: '10px' }}>
            <Button variant="contained" onClick={handleFormSubmit} style={{ width: '50%', marginRight: '10px' }}>
              Update
            </Button>
            <Button variant="contained" style={{ width: '50%' }}>
              Cancel
            </Button>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default EditAdmission;
