import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../../Dynamic/Form/FormStyle.css";
import DynamicDataTable from "./DataTable";
import { useStateContext } from "../../contexts/ContextProvider.js";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const authToken = Cookies.get("token");

function NewRegistration() {
  const { currentColor } = useStateContext();
  const { setAllStudentData } = useStateContext();
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/adminRoute/getRegistrations", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("Full response:", response);

        if (response.data && Array.isArray(response.data.data)) {
          setSubmittedData(response.data.data);
          setAllStudentData(response.data.data);
        } else {
          console.error("Data format is not as expected:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [shouldFetchData]);

  const handleDelete = (email) => {
    axios
      .put(
        `http://localhost:4000/api/v1/adminRoute/deactivateStudent`,
        { email },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Student data deleted successfully");
        const updatedData = submittedData.filter(
          (item) => item.email !== email
        );
        setSubmittedData(updatedData);
        toast.success("Student data deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting Student data:", error);
        toast.error("An error occurred while deleting the Student data.");
      });
  };

  return (
    <div className="md:mt-1  mx-auto p-3">
      <h1
        className="text-4xl font-bold mb-4 uppercase text-center  hover-text "
        style={{ color: currentColor }}
      >
        New Registration
      </h1>
      <div className="flex items-center justify-between">
        <Link
          to="/admin"
          className="dark:text-white dark:bg-secondary-dark-bg   neu-btn border-2 "
          style={{ border: `2px solid ${currentColor} `, color: currentColor }}
        >
          Back
        </Link>
        <Link
          to="./form"
          className="dark:text-white dark:bg-secondary-dark-bg   neu-btn border-2 "
          style={{ border: `2px solid ${currentColor} `, color: currentColor }}
        >
          New Registration
        </Link>
      </div>

      <DynamicDataTable data={submittedData} handleDelete={handleDelete} />
    </div>
  );
}

export default NewRegistration;
