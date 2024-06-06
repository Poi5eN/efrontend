import {useState, useEffect} from 'react'
import React  from 'react';
import axios from 'axios';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from 'js-cookie';
import { useStateContext } from '../contexts/ContextProvider';
const authToken = Cookies.get('token');



const Syllabus = () => {
  const {currentColor} = useStateContext();
  const[curriculumData, setCurriculumData] = useState([]);

  const handleDeleteCurriculum = (id)=>{

  }

  // useEffect(() => {
  //   axios.get("https://average-red-kimono.cyclic.app/api/v1/adminRoute/getAllCurriculum", {
  //     withCredentials: true,
      // headers: {
      //   Authorization: Bearer ${authToken},
      // },
  //   })
  //   .then((response) => {
  //     console.log("CurriculumDATA-->", response.data)
  //     const {allCurriculum} = response.data;
  //     console.log("GetALLCLASS--->", allCurriculum)
  //     setCurriculumData(allCurriculum);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching class data:', error);
  //   });
  // }, []);
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

  console.log("jsjscgjsfchckjajcg", studentData)

  useEffect(() => {
    if (studentData.class) {
      axios
        .get(
          `https://average-red-kimono.cyclic.app/api/v1/adminRoute/getAllCurriculum?className=${studentData.class}`,
          {
            withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          }
        )
        .then((response) => {
          console.log("CurriculumDATA-->", response.data);
        const { allCurriculum } = response.data;
        console.log("GetALLCLASS--->", allCurriculum);
        setCurriculumData(allCurriculum);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [studentData.class]);

  console.log("CurriculumData--->", curriculumData)
 


  return (
//     <div className="min-h-screen p-8 flex flex-col ">

// <div className="mt-4">
//         <h2 className="text-lg font-semibold text-indigo-600">Created Curriculum</h2>
//         <ul>
//           {curriculumData.map((item, index) => (
//             <li key={index} className="mt-2">
//               <div className="bg-white pt-2 pb-2 pl-5 pr-0 rounded-md shadow-md">
//               <p className="text-gray-600">AcademicYear: {item.academicYear}</p>
//                  <p className="text-gray-600">Class: {item.className}</p>
//                  <p className="text-gray-600">Course: {item.course}</p>
//               {item.file && (
//                   <div className="mb-4">
//                     <label className="text-lg  mb-2">View PDF:</label>
//                     <a  href={item.file.url} target="_blank" rel="noopener noreferrer"  className="text-blue-500 hover:underline">
//                     View Image
//                     </a>
//                   </div>
//                 )}
//               </div>
            
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
<div className="mt-4 w-full">
<h2 
className="text-4xl font-bold mb-4 uppercase text-center dark:text-white  hover-text "
style={{color:currentColor}}
>
  Curriculum
</h2>

<div className="overflow-x-auto">
<table className="w-full border-collapse border border-gray-500">
<thead>
<tr
style={{background : currentColor}}
 className="bg-cyan-600 text-white">
<th className="w-1/4 p-2 border border-gray-500 whitespace-nowrap">Academic Year</th>
<th className="w-1/4 p-2 border border-gray-500">Class</th>
{/* <th className="w-[100px] border">Course</th> */}
<th className="w-1/4 p-2 border border-gray-500">Files</th>
{/* <th className="w-1/4 p-2 border border-gray-500">Action</th> */}
</tr>
</thead>
<tbody>
{curriculumData.map((item, index) => (
<tr key={index} className="border border-gray-500 text-center dark:text-white dark:bg-secondary-dark-bg  ">
  <td className="p-2 border border-gray-500 whitespace-nowrap">{item.academicYear}</td>
  <td className="p-2 border border-gray-500">{item.className}</td>
  {/* <td className="w-[100px] text-center  border">
    {item.course}
  </td> */}
  <td className="p-2 border border-gray-500">
    {item.file && (
      <a
        href={item.file.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        View
      </a>
    )}
  </td>
  {/* <td className="p-2 border border-gray-500">
    <IconButton
      onClick={() => handleDeleteCurriculum(index)}
      className="bg-red-500 border px-3 py-2 mt-2 w-full hover:bg-red-600"
    >
      <DeleteIcon className="text-red-600" />
    </IconButton>
  </td> */}
</tr>
))}
</tbody>
</table>
</div>



</div>
  )
}

export default Syllabus