import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useStateContext } from "../../contexts/ContextProvider";

const authToken = Cookies.get("token");
const ViewReg = () => {

  const { registrationNumber } = useParams();
  const [studentData, setStudentData] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const receiptRef = useRef(null);
const { currentColor } = useStateContext();
  const date = new Date(studentData.createdAt);
  const formattedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  const schoolName = localStorage.getItem("schoolName");
  const image = localStorage.getItem("image");
  const schoolAddress = localStorage.getItem("schooladdress");
  const schoolContact = localStorage.getItem("contact");

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/v1/adminRoute/getRegistration/${registrationNumber}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }
      )
      .then((response) => {
        const data = response.data.data;
        setStudentData(data);
      })
      .catch((error) => {
        console.error("Error fetching Student data:", error);
      });
  }, [registrationNumber]);

  const handleDownload = () => {
    if (!imageLoaded) {
      alert("Please wait for the image to load.");
      return;
    }

    const input = receiptRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`registration_receipt_${registrationNumber}.pdf`);
    });
  };

  return (
    <>
    <div className=" w-[80%] mx-auto flex justify-between">
    <Link
        to="/admin/newregistration"
        className="dark:text-white dark:bg-secondary-dark-bg text-gray-800  neu-btn border-2 "
        style={{ border: `2px solid ${currentColor} `, color: currentColor }}
      >
        Back
      </Link>
    <button onClick={handleDownload}  className="dark:text-white dark:bg-secondary-dark-bg text-gray-800  neu-btn border-2 "
          style={{ border: `2px solid ${currentColor} `, color: currentColor }}
          
          >
        Download PDF
      </button>
    </div>
      
      <div className="max-w-2xl mx-auto p-4 border border-black bg-yellow-100" id="receipt" ref={receiptRef}>
        <div>
          <div className="flex justify-between">
            <img
              className="w-[100px] h-[100px] rounded-full"
              src={image}
              alt="school logo"
              onLoad={() => setImageLoaded(true)}
            />
            <span>Reg.No. {studentData.registrationNumber}</span>
          </div>
          <div className="text-center text-sm mb-4"> Registration Receipt</div>
          <div className="text-center font-bold text-xl mb-4">
            {schoolName}
            <p className="text-sm text-gray-700 ">{schoolAddress}</p>
            <p className="text-sm text-gray-700 ">Mobile No. : {schoolContact}</p>
          </div>
          <div className="mb-4">
            <div className="flex justify-between border-b-1 border-black border-dashed pb-2">
              <span>Reg. Date  : {formattedDate} </span>
              <span>Session : 2024-25</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span>Student's Name : {studentData.studentFullName}</span>
            <span>guardian's Name : {studentData.guardianName}</span>
            <span>Email: {studentData.studentEmail}</span>
            <span>Gender: {studentData.gender}</span>
            <span>Class : {studentData.registerClass}</span>
            <span>Mob : {studentData.mobileNumber}</span>
            <span>Address : {studentData.studentAddress}</span>
          </div>
          <div className="my-4">
            <div className="flex justify-end border-b-1 border-black border-dashed">
              {/* <span>Date of payment : {formattedDate} </span> */}
            </div>
          </div>
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th className="border border-black p-2">Sr. No.</th>
                <th className="border border-black p-2">Particulars</th>
                <th className="border border-black p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2 text-center">1</td>
                <td className="border border-black p-2 text-center">Admission Fee</td>
                <td className="border border-black p-2 text-center">{studentData.amount}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end mb-4">
            <span>{studentData.amount}/-</span>
          </div>
          <div className="flex justify-between mb-4 my-10">
            <span>Signature of Principal</span>
            <span>Signature of Student</span>
          </div>
          <div className="text-center text-sm">
          I hereby, declearing that I will obey all the rules and regulations of the institution and be fully responsible
          for violating the rules.
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewReg;




// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Cookies from "js-cookie";
// const authToken = Cookies.get("token");
// const ViewReg = () => {
//   const { registrationNumber } = useParams();

//   const [studentData, setStudentData] = useState({});
//   const date = new Date(studentData.createdAt);
//   const formattedDate = `${
//     date.getMonth() + 1
//   }/${date.getDate()}/${date.getFullYear()}`;

//   const schoolName = localStorage.getItem("schoolName");
//   const image = localStorage.getItem("image");
//  const schoolAddress= localStorage.getItem("schooladdress")
//  const schoolContact=  localStorage.getItem("contact")
//  console.log("schoolContact",schoolContact)
//   useEffect(() => {
//     // Fetch teacher data based on the email parameter
//     axios
//       .get(`http://localhost:4000/api/v1/adminRoute/getRegistration/${registrationNumber}`, {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })
//       .then((response) => {
//         const data = response.data.data;
//         setStudentData(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching Student data:", error);
//       });
//   }, []);
//   console.log("studentDatass", studentData.guardianName);
//   return (
//     <div className="max-w-2xl mx-auto p-4 border border-black bg-yellow-100">
//          <div className="flex justify-between">
//          <img src={image} alt="school logo" />
//          <span>Reg.No. {studentData.registrationNumber}</span>
//          </div>
//       <div className="text-center  text-sm mb-4"> Registration Receipt</div>
//       <div className="text-center font-bold text-xl mb-4">
//      {schoolName}
//     < p className="text-sm text-gray-700 ">
//         {schoolAddress}
//     </p>
//     <p  className="text-sm text-gray-700 ">
//        Mobile No. : {schoolContact}
//     </p>
//       </div>
//       <div className="mb-4">
//         <div className="flex justify-between border-b-1 border-black border-dashed">
//         <span>Reg. Date  : {formattedDate} </span>
//           <span>Session : 2024-25</span>
//         </div>
//       </div>
//       <div className="flex flex-col">
//         <span>Student's Name : {studentData.studentFullName}</span>
//         <span>guardian's Name : {studentData.guardianName}</span>
//         <span>Email: {studentData.studentEmail}</span>
//         <span>Gender: {studentData.gender}</span>
//         <span>Class : {studentData.registerClass}</span>
//         <span>Mob : {studentData.mobileNumber}</span>
//         <span>Address : {studentData.studentAddress}</span>
//       </div>
//       <div className="my-4">
//         <div className="flex justify-end border-b-1 border-black border-dashed">
//           {/* <span>Date of payment : {formattedDate} </span> */}
//         </div>
//       </div>
//       <table className="w-full mb-4">
//         <thead>
//           <tr>
//             <th className="border border-black p-2">Sr. No.</th>
//             <th className="border border-black p-2">Particulars</th>
//             <th className="border border-black p-2">Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="border border-black p-2 text-center">1</td>
//             <td className="border border-black p-2 text-center">Admission Fee</td>
//             <td className="border border-black p-2 text-center">{studentData.amount}</td>
//           </tr>
          
//         </tbody>
//       </table>
//       <div className="flex justify-end mb-4">
//         <span>{studentData.amount}/-</span>
//       </div>
//       <div className="flex justify-between mb-4 my-10">
//         <span>Signature of Centre Head</span>
//         <span>Signature of Student</span>
//       </div>
//       <div className="text-center text-sm">
//         All above mentioned Amount once paid are non refundable in any case
//         whatsoever.
//       </div>
//     </div>
//   );
// };

// export default ViewReg;
