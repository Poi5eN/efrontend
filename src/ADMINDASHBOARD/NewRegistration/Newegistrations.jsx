import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider.js";
import { Link } from "react-router-dom";
import DynamicDataTable from "./DataTable.jsx";
import axios from "axios";
import Cookies from "js-cookie";

const Newegistrations = () => {
  const authToken = Cookies.get("token");
  const { currentColor } = useStateContext();
  const [registrationData,setRegistrationData]=useState()

  useEffect(() => {
    try {
      axios
        .get("/api/api/v1/adminRoute/getRegistrations", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) =>{
            setRegistrationData(response.data.data)
            console.log("response", response)
        })
        .catch((error) => {
          console.log("Error response data:", error);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },[]);
  console.log("registrationData",registrationData)
  return (
    <div className="md:mt-1 mx-auto p-3">
      <h1
        className="text-4xl font-bold uppercase text-center hover-text "
        style={{ color: currentColor }}
      >
        New Registration
      </h1>
      <div className="flex justify-between items-center mb-4">
        <Link
          to="/admin"
          className="dark:text-white dark:bg-secondary-dark-bg neu-btn"
          style={{ color: currentColor, border: `2px solid ${currentColor}` }}
        >
          Back
        </Link>
        <Link
          to="./registrationform"
          className="dark:text-white dark:bg-secondary-dark-bg neu-btn"
          style={{ color: currentColor, border: `2px solid ${currentColor}` }}
        >
          New Registraction
        </Link>
      </div>
      <DynamicDataTable data={registrationData} />
    </div>
  );
};

export default Newegistrations;
