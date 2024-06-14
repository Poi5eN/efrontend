import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
const authToken = Cookies.get('token');

const EditPrimary = () => {
  const navigate = useNavigate();
  const { className } = useParams();
  const [classData, setClassData] = useState({});
  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    section: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  useEffect(() => {
    axios
    .get(
      `http://localhost:4000/api/v1/adminRoute/getAllClass?className=${className}`,
        { withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }
    )
      .then((response) => {
        const  data  = response.data.classList[0];
        setClassData(data);
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
    axios
      .put(`http://localhost:4000/api/v1/adminRoute/updateClass`, formData, { withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },})
      .then((response) => {
        console.log("Class data updated successfully");
        navigate("/admin/primary");
      })
      .catch((error) => {
        console.error("Error updating class data:", error);
      });
  };

  return (

    <div style={{textAlign: "center", padding: "20px", }}>
      <h1 style={{ fontSize: "30px", fontWeight: "900" }}>Edit Class</h1>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <Box className="py-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4 bg-white rounded-md shadow-lg">
          <TextField
            label="Class Name"
            name="className"
            type="text"
            value={formData.className}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom:"20px" }}
          />
          <TextField
            label="Section"
            name="section"
            type="text"
            value={formData.section}
            onChange={handleOnChange}
            required
            style={{ width: "70%", paddingBottom:"20px" }}
          />
          <TextField
            label="Subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleOnChange}
            required
            readOnly
            style={{ width: "70%", paddingBottom:"20px" }}
          />
        </Box>
          <Link to="/admin/primary">
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

export default EditPrimary;
