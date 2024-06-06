import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useStateContext } from '../contexts/ContextProvider';
const authToken = Cookies.get('token');

const StudentExams= () => {
  const {currentColor} = useStateContext();
  const [examData, setExamData] = useState([]);
  const data = JSON.parse(localStorage.getItem("response"));
  console.log("LocalStorage-->", data)

  const[studentData, setStudentData] = useState([]);
  const email = localStorage.getItem("email");
  useEffect(() => {
    // GET Request to fetch existing notices
    axios.get(`https://average-red-kimono.cyclic.app/api/v1/adminRoute/getAllStudents?email=${email}`,
      {
        withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      }, // Set withCredentials to true
      })
      .then((response) => {
        console.log('Yes---->', response.data.allStudent)
        setStudentData(response.data.allStudent[0]);
        console.log("StudentDashBoard--->", response.data.allStudent[0])
      })
      .catch((error) => {
        console.error('Error fetching notices:', error);
      });

  }, []);


  useEffect(() => {
    if (studentData.class && studentData.section) {
      axios
        .get(
          `https://average-red-kimono.cyclic.app/api/v1/exam/getAllExams?className=${studentData.class}&section=${studentData.section}`,
          {
            withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          }
        )
        .then((response) => {
          const examData = response.data.examData;
          setExamData(examData);
          console.log("ADMIN----Exam-Data---> check1", examData);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [studentData.class, studentData.section]);


  return (
    <div>
      {/* <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Exam</h2>
        <div className="overflow-x-auto bg-gray-100 rounded-lg p-4">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border text-left px-4 py-2">Class</th>
                <th className="border text-left px-4 py-2">Section</th>
                <th className="border text-left px-4 py-2">Exam Name</th>
                <th className="border text-left px-4 py-2">Subjects</th>
                
              </tr>
            </thead>
            <tbody>
              {console.log("first", examData)}
              {examData.map((data, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{data.className}</td>
                  <td className="border px-4 py-2">{data.section}</td>
                  <td className="border px-4 py-2">{data.examName}</td>
                  <td className="border px-4 py-2">
                    {data.examInfo.map((subject, i) => (
                      <div key={i}>
                        {subject.subjectName} - Date:{" "}
                        {subject.examDate
                          ? subject.examDate.split("T")[0]
                          : ""}, Time: {subject.startTime} -{" "}
                        {subject.endTime}, Total Marks:{" "}
                        {subject.subjectTotalMarks}
                    
                      </div>
                    ))}
                  </td>

                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
      <div className="mt-8">
  <h2 
  className="text-4xl font-bold mb-4 uppercase text-center dark:text-white  hover-text "
  style={{color:currentColor}}
  >Exam</h2>
  <div className="overflow-x-auto bg-gray-100 rounded-lg p-4 dark:text-white dark:bg-secondary-dark-bg   ">
    <table className="w-full border-collapse table-auto">
      <thead>
        <tr className="bg-gray-200" 
          style={{background : currentColor}}
        >
          <th className="border text-left  p-2">Class</th>
          {/* <th className="border text-left px-4 py-2">Section</th> */}
          <th className="border text-left  p-2">Exam Name</th>
          <th className="border text-left px-4 py-2"></th>
         
          
        </tr>
      </thead>
      <tbody>
        {/* {console.log("first", examData)} */}
        { examData.map((data, index) => (
          <tr 
          key={index}>
            <td className="border  p-2">{data.className}-{data.section}</td>
          
            <td className="border p-2">{data.examName}</td>
            <div className="border p-2">
             <tr 
             style={{background : currentColor}}
             className=" bg-cyan-600 border-2 text-white border-gray-500 w-full flex justify-around">
             <th className="w-[100px]">Subject</th>
             <th className="w-[100px]">Date</th>
             <th className="w-[100px]">Timimg</th>
             <th className="w-[100px]">Total Marks</th>
             </tr>
              {data.examInfo.map((subject, i) => (
                  <>
              
                <div key={i}>
               
             
                  <tr 
                 
                  className="  border-2 border-gray-500 w-full flex justify-around">

                   <td  className="w-[100px] text-center">{subject.subjectName}</td> 
                   <td  className="w-[100px] text-center">{subject.examDate ? subject.examDate.split("T")[0] : ""}</td>
               <td  className="w-[100px] text-center">{subject.startTime} - {subject.endTime}</td>
                   <td  className="w-[100px] text-center">{subject.subjectTotalMarks}</td>
                
                  
                  </tr>
                 
                </div>
                  </>
              ))}
            </div>
           
           
          
          </tr>
        ))}
        
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
};

export default StudentExams;