// ViewProfile.js
import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import { FcLeft } from "react-icons/fc";
import "../../Dynamic/Form/FormStyle.css";
import { usePDF } from "react-to-pdf";
import Cookies from "js-cookie";
const authToken = Cookies.get("token");

const ViewTeacher = () => {
  const { email } = useParams();
  const [teacherData, setTeacherData] = useState({});
  const { toPDF, targetRef } = usePDF({ filename: "Teacher.pdf" });
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const options = {
    // default is `save`
    method: "open",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.HIGH,
    page: {
      format: "a4", // Set the format to A4
      // You can also adjust other properties like margin and orientation if needed
      margin: Margin.SMALL,
      orientation: "portrait", // or 'landscape' as per your requirement
    },
    canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: "image/png",
      qualityRatio: 1,
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true,
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
        useCORS: true,
      },
    },
  };

  useEffect(() => {
    // Fetch teacher data based on the email parameter
    axios
      .get(
        `http://localhost:4000/api/v1/adminRoute/getTeachers?email=${email}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          }, // Set withCredentials to true
        }
      )
      .then((response) => {
        const data = response.data.data[0];
        console.log(data);
        setTeacherData(data);
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      });
  }, [email]);

  const downloadButton = (
    <button className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
      <svg
        className="fill-current w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
      </svg>
      <span className="">Download</span>
    </button>
  );

  const handlePDFGeneration = () => {
    setGeneratingPDF(true); // Set state to true when PDF generation starts

    // Implement logic to generate PDF here
    // Use the options and necessary logic to create the PDF
    // For example:
    setTimeout(() => {
      toPDF(targetRef.current, options)
        .then(() => {
          setGeneratingPDF(false); // Reset state when PDF generation is done
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
          setGeneratingPDF(false); // Reset state even if there's an error
        });
    }, 100);
  };

  return (
    <>
      <div className=" flex items-center justify-center pt-10 ">
        <div
          ref={targetRef}
          className="bg-white  gap-2 sm:p-4 md:p-4 lg:p-4 p-2 pt-16 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 shadow-[rgba(0,0,_0,_0.25)_0px_25px_50px-12px]   overflow-y-auto"
        >
          <div className=" bg-[#01a9ac]  p-5   hover:shadow-[rgba(6,24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] rounded-md">
            {/* <div className="absolute bg-white w-[50px] h-[50px] rounded-full flex justify-center items-center shadow-2xl">
              <Link to="/admin/allteachers" className=" text-blue-500 text-3xl">
                <FcLeft />
              </Link>
            </div> */}
            <div className=" flex justify-center mt-4">
              {teacherData.image && teacherData.image.url ? (
                <img
                  className="w-[150px] h-[150px] rounded-full border-yellow-400 border-2"
                  src={teacherData.image.url}
                  alt="Image"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="p-8">
              <h2 className="text-center text-lg text-white font-bold  ">
                {" "}
                {teacherData.fullName}
              </h2>
              <h2 className="text-center text-lg text-white font-bold">
                {" Status: "}
                {teacherData.status}
              </h2>
              <h2 className="text-center text-white font-bold">
                {"  "}
                +91{teacherData.contact}
              </h2>
              <hr />
              <div className="h-14 ">
                <p className=" p-2 font-bold">{`Address : ${teacherData.address}`}</p>
              </div>
              <div
                onClick={() => {
                  handlePDFGeneration();
                }}
                className="flex justify-center mt-3 "
              >
                {!generatingPDF && downloadButton}
              </div>
            </div>
          </div>
          <div className="w-[330px] border-1 rounded-md border-[#01a9ac] p-5   hover:shadow-[rgba(6,24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
            <h1 className="text-center mb-3 font-extrabold">
              {" "}
              {teacherData.fullName}'s Details
            </h1>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Employee ID:</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.employeeId}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Email :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.email}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Gender :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.gender}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Qualification :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.qualification}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] "> Salary :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.salary} / month
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Subject :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.subject}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Class :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.classTeacher}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Section :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.section}
              </span>
            </div>
            <div className="flex gap-2 border-b-1  border-green-300 p-1">
              <h2 className="w-[100px]  text-[14px] ">DOB :</h2>
              <span className="w-[200px] font-semibold text-[#01a9ac]  text-[12px]">
                {new Date(teacherData.dateOfBirth).toLocaleDateString("en-US")}
              </span>
            </div>

            <div className="flex gap-2 border-b-1  border-green-300 p-1">
              <h2 className="w-[100px]  text-[14px] ">Joining Date :</h2>
              <span className="w-[200px] font-semibold text-[#01a9ac]  text-[12px]">
                {new Date(teacherData.joiningDate).toLocaleDateString("en-US")}
              </span>
            </div>

            <div className="flex gap-2 border-b-1  border-green-300 p-1 ">
              <h2 className="w-[100px]  text-[14px] ">Experience :</h2>
              <span className="w-[200px]font-semibold text-[#01a9ac]  text-[12px]">
                {" "}
                {teacherData.experience} yrs
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTeacher;
