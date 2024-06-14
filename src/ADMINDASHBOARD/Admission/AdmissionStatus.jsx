import React, { useState, useEffect } from "react";
import InputForm from "../../Dynamic/Form/InputForm";
import { toast } from "react-toastify";
import DataTable from "../Admission/DataTable";
import Modal from "react-modal";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import Cookies from "js-cookie";
const authToken = Cookies.get("token");

function AdmissionStatus({ data }) {
  const { currentColor } = useStateContext();
  const modalStyle = {
    content: {
      width: "80%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
      background:currentColor
    },
  };
  const [submittedData, setSubmittedData] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios
      .get(
        "http://localhost:4000/api/v1/adminRoute/getLastYearStudents",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          }, // Set withCredentials to true
        }
      )
      .then((response) => {
        if (Array.isArray(response.data.allStudent)) {
          // Update the state with the array
          setSubmittedData(response.data.allStudent);
          console.log(response.data.allStudent);
        } else {
          console.error("Data format is not as expected:", response.allStudent);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error gracefully, e.g., show an error message to the user
      });
  }, [shouldFetchData]);
  return (
    <div className=" mt-12 md:mt-1  mx-auto p-3 ">
      <h1 
      className="text-4xl font-bold mb-4 uppercase text-center  hover-text "
      style={{color:currentColor}}
      >
        Admission Status
      </h1>
      <DataTable data={submittedData} />
    </div>
  );
}

export default AdmissionStatus;
