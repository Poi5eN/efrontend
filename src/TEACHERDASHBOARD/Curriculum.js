import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStateContext } from "../contexts/ContextProvider";
import Cookies from 'js-cookie';
const authToken = Cookies.get('token');

const Api_GetAll = "http://localhost:4000/api/v1/adminRoute/getAllCurriculum";
const Delete_API ="http://localhost:4000/api/v1/adminRoute/deleteCurriculum";

const Curriculum = () => {
  const { currentColor} = useStateContext();
  const [selectedGrade, setSelectedGrade] = useState('');
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    academicYear: '2023-2024',
    className: '',
    course: '',
    image: null,
  });

  const[curriculumData, setCurriculumData] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false)

  const handleGradeChange = (e) => {
    const selectedGrade = e.target.value;
    setSelectedGrade(selectedGrade);

    // Set the selected grade's courses in the form data
    const selectedClass = data.find(item => item.className === selectedGrade);
    
    if (selectedClass) {
      setFormData({ ...formData, className: selectedGrade, course: selectedClass.subject.join(',') });
    }
  };

  
  
  const handlePDFUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  
 

  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("academicYear", formData.academicYear);
    formDataToSend.append("className", formData.className);
    formDataToSend.append("course", formData.course);
    formDataToSend.append("image", formData.image);

    axios
      .post("http://localhost:4000/api/v1/adminRoute/createCurriculum", formDataToSend, {
        withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data"
      }
      })
      .then((response) => {
        console.log("Curriculum created successfully!");
        setFormData({ academicYear: '2023-2024',  className: '', course: '', image: null });

        setShouldFetchData(!shouldFetchData);
      })
      .catch((error) => {
        console.error('Error creating curriculum:', error);
      });
  };
 
  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/adminRoute/getAllCurriculum", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      console.log("CurriculumDATA-->", response.data)
      const {allCurriculum} = response.data;
      console.log("GetALLCLASS--->", allCurriculum)
      setCurriculumData(allCurriculum);
    })
    .catch((error) => {
      console.error('Error fetching class data:', error);
    });
  }, [shouldFetchData]);
 
 
 
  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/adminRoute/getAllClass", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      const { classList } = response.data;
      console.log(classList)
      setData(classList);
    })
    .catch((error) => {
      console.error('Error fetching class data:', error);
    });
  }, []);

  const handleDeleteCurriculum = (index) => {
    const curriculumId = curriculumData[index]._id; 
    axios
      .delete("http://localhost:4000/api/v1/adminRoute/deleteCurriculum/" + curriculumId, {
        withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      })
      .then(() => {
        const updatedCurriculum = [...curriculumData];
        updatedCurriculum.splice(index, 1);
        setCurriculumData(updatedCurriculum);
      })
      .catch((error) => {
        console.error('Error deleting curriculumData:', error);
      });
  };
  


  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 uppercase text-center  hover-text"
        style={{color:currentColor}}
        >School Curriculum</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="mb-4">
              <label className="text-xl font-semibold mb-2">Academic Year:</label>
              <select
                className="text-gray-600 bg-gray-100 p-2 rounded-md w-full"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
              >
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-xl font-semibold mb-2">Class:</label>
              <select
                className="text-gray-600 bg-gray-100 p-2 rounded-md w-full"
                value={selectedGrade}
                onChange={handleGradeChange}
              >
                <option value="">Select class</option>
                {data
                .slice()
                .sort((a, b) => parseInt(a.className, 10) - parseInt(b.className, 10))
                .map((item) => (
                  <option key={item.className} value={item.className}>
                    {item.className}
                  </option>
                ))}
                {/* {data.map((item) => (
                  <option key={item.className} value={item.className}>
                    {item.className}
                  </option>
                ))} */}
              </select>
           
            </div>
            <div className="mb-4">
              <label className="text-xl font-semibold mb-2">Courses:</label>
              <ul className="text-gray-600"> <li>{formData.course}</li></ul>
            </div>
            <div className="mb-4">
              <label className="text-xl font-semibold mb-2">Upload Curriculum PDF:</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePDFUpload}
                className="text-gray-600 bg-gray-100 p-2 rounded-md w-full"
              />
            </div>
          </div>
          <button  
           className="dark:text-white dark:bg-secondary-dark-bg text-gray-800   mx-auto neu-btn border-2 "
           style={{border:`2px solid ${currentColor} `,color:currentColor}}
          type="submit">Submit</button>
        </form>

        {/* <div className="mt-4">
        <h2 className="text-lg font-semibold text-indigo-600">Created Curriculum</h2>
        <ul>
          {curriculumData.map((item, index) => (
            <li key={index} className="mt-2">
              <div className="bg-white pt-2 pb-2 pl-0 pr-0 rounded-md shadow-md">
              <p className="text-gray-600">AcademicYear: {item.academicYear}</p>
                 <p className="text-gray-600">Class: {item.className}</p>
                 <p className="text-gray-600">Course: {item.course}</p>
              {item.file && (
                  <div className="mb-4">
                    <label className="text-lg  mb-2">View PDF:</label>
                    <a  href={item.file.url} target="_blank" rel="noopener noreferrer"  className="text-blue-500 hover:underline">
                    View Image
                    </a>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleDeleteCurriculum(index)}
                className="bg-red-500 text-white px-3 py-2 mt-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div> */}



     
     
      </div>
       
      <div className="mt-4 w-full">
        <h2 className="text-2xl font-semibold text-cyan-700 uppercase text-center">
          Created Curriculum
        </h2>
      
        <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-500">
    <thead>
      <tr className="bg-cyan-600 text-white">
        <th className="w-1/4 p-2 border border-gray-500 whitespace-nowrap">Academic Year</th>
        <th className="w-1/4 p-2 border border-gray-500">Class</th>
        {/* <th className="w-[100px] border">Course</th> */}
        <th className="w-1/4 p-2 border border-gray-500">Files</th>
        <th className="w-1/4 p-2 border border-gray-500">Action</th>
      </tr>
    </thead>
    <tbody>
      {curriculumData.map((item, index) => (
        <tr key={index} className="border border-gray-500 text-center">
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
          <td className="p-2 border border-gray-500">
            <IconButton
              onClick={() => handleDeleteCurriculum(index)}
              className="bg-red-500 border px-3 py-2 mt-2 w-full hover:bg-red-600"
            >
              <DeleteIcon className="text-red-600" />
            </IconButton>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>


        {/* <tbody>
          <table>
            <tr>
              <tr  className=" bg-cyan-600 border-2 border-gray-500 ">
                <th className="w-[100px] border">AcademicYear</th>
                <th className="w-[100px] border">Class</th>
               
                <th className="w-[100px] border">Files</th>
                <th className="w-[100px] border">Action</th>
              </tr>

              {curriculumData.map((item, index) => (
                
                 
                    <tr key={index} className="  border-2 border-gray-500 ">
                      <td className="w-[100px] text-center border">
                        {item.academicYear}
                      </td>
                      <td className="w-[100px] text-center border">
                        {item.className}
                      </td>
                    
                      <td className="w-[100px] text-center border">
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
                      <td>
                        <IconButton
                          onClick={() => handleDeleteCurriculum(index)}
                          className="bg-red-500 border  px-3 py-2 mt-2 w-[100px] hover:bg-red-600"
                        >
                          <DeleteIcon className="text-red-600" />
                        </IconButton>
                      </td>
                    </tr>
                 
                
              ))}
              
            </tr>
          </table>
        </tbody> */}
       
      </div>

    </div>
  );


};

export default Curriculum;
