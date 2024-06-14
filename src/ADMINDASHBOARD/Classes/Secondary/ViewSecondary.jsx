// ViewProfile.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { FcLeft } from "react-icons/fc";
import Cookies from 'js-cookie';
const authToken = Cookies.get('token');
// import "../Dynamic/Form/FormStyle.css";

const ViewSecondary = () => {
  const { className } = useParams();

  console.log("P2 --- className", className)

  const [classData, setClassData] = useState({});

  useEffect(() => {
    // Fetch teacher data based on the email parameter
    axios
      .get(
        `http://localhost:4000/api/v1/adminRoute/getAllClass?className=${className}`,
        { withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          }, }
      )
      .then((response) => {

        console.log("P2 -----", response);

        const data = response.data.classList[0];
        setClassData(data);
      })
      .catch((error) => {
        console.error("Error fetching class data:", error);
      });
  }, []);

  return (
    <>
      <div className=" w-full flex items-center justify-center pt-10">
        <div className="bg-white rounded-md  sm:p-4 md:p-4 lg:p-4 p-2 pt-16  shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]   overflow-y-auto">
          {/* <div className="w-[330px]  bg-[#01a9ac]  p-5   hover:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
          </div> */}
          {/* <div className="absolute bg-white w-[50px] h-[50px] rounded-full flex justify-center items-center shadow-2xl">
            <Link to="/admin/primary" className=" text-blue-500 text-3xl">
              <FcLeft />
            </Link>
          </div> */}

          <div className="w-[330px] h-[100%] border-1 rounded-md border-[#01a9ac] p-5   hover:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] overflow-hidden">
            <h1 className="text-center mb-3 font-extrabold">
              {" "}
              Class DataTable
            </h1>

            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Class:</h2>
              <span className="w-[200px] font-semibold text-[#01a9ac]  text-[20px]">
                {" "}
                {classData.className}
              </span>
            </div>

            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Section:</h2>
              <span className="w-[200px] font-semibold text-[#01a9ac]  text-[20px]">
                {" "}
                {classData.section}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 w-full ">
              <h2 className="w-[100px]  text-[14px] ">Subject:</h2>
              <ul>
                {classData.subject ?.map((subject, index) => (
                  <li
                    key={index}
                    className="font-semibold text-[#01a9ac]  text-[12px]"
                  >
                    {subject}
                  </li>
                ))}
              </ul>
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSecondary;
