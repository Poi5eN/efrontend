
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useStateContext } from "../contexts/ContextProvider";
const authToken = Cookies.get('token');
const Study = () => {
  const { currentColor} = useStateContext();
  // const [fetchData, setFetchData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    link: '',
    image: null ,

  });

const API_BASE_URL="http://localhost:4000/api/v1/teacher"
  const API_POST_URL = "http://localhost:4000/api/v1/createStudyMaterial";
const API_DELETE = "http://localhost:4000/api/v1/adminRoute/deleteNotice/";
const API_GET_DATA = "http://localhost:4000/api/v1/deleteStudyMaterial";

// const [submittedData, setSubmittedData] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  const addMaterial = () => {
    // Create a new material and send a POST request to the server
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // if (key === "image") continue;
      // formDataToSend.append(key, String(value));
      if (key !== "image") {
        formDataToSend.append(key, String(value));
      }
    });
    formDataToSend.append("image", formData.image);

    axios.post(`${API_BASE_URL}/createStudyMaterial`,   formDataToSend,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",

      }, // Set withCredentials to true
    })
      .then((response) => {
        // Assuming the server responds with the created material
        const createdMaterial = response.data;
        setMaterials([...materials, createdMaterial]);
        setFormData({ title: '', type: '', link: '', image: null  });
        closeModal();
        setShouldFetchData(!shouldFetchData);
      })
      .catch((error) => {
        console.error('Error adding material:', error);
      });
  };

  const deleteMaterial = (material, index) => {
    // Send a DELETE request to the server to delete the material
    console.log("index",material)
    axios.delete(`${API_BASE_URL}/deleteStudyMaterial/${material._id}`,{
        withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      }, 
    })
      .then(() => {
        const updatedMaterials = [...materials];
        updatedMaterials.splice(index, 1);
        setMaterials(updatedMaterials);
      })
      .catch((error) => {
        console.error('Error deleting material:', error);
      });
  };

  useEffect(() => {
    // Fetch materials from the server using a GET request
    axios.get(`${API_BASE_URL}/getStudyMaterial`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    })
      .then((response) => {
        const materialsData = response.data.study;
        setMaterials(materialsData);
      })
      .catch((error) => {
        console.error('Error fetching materials:', error);
      });
    }, [shouldFetchData]);
    console.log(formData)

 

  

  
console.log(materials)
  return (
    <div className="p-4 text-center bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 uppercase text-center  hover-text"
      style={{color:currentColor}}
      >Study Materials</h1>

      <button
       className="dark:text-white dark:bg-secondary-dark-bg text-gray-800   mx-auto neu-btn border-2 "
       style={{border:`2px solid ${currentColor} `}}
        onClick={openModal}
      >
        Add Material
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4 uppercase text-center  hover-text "
        style={{color:currentColor}}>Add New Material</h2>
              <input
                type="text"
                placeholder="Title"
                className="w-full border rounded p-2 mb-2"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <div className="mb-2">
                <label htmlFor="materialType">Material Type</label>
                <select
                  id="materialType"
                  className="w-full border rounded p-2"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })}
                >  
                  <option >Select Type</option>
                  <option value="video">Video</option>
                  <option value="PDF">PDF</option>
                  <option value="youtube">YouTube</option>
                  <option value="Notes">Notes</option>
                </select>
              </div>
              {(formData.type === 'PDF' || formData.type === 'Notes') && (
                <input
                  type="file"
                  // accept=".pdf"
                  className="w-full border rounded p-2 mb-4"
                  onChange={handleImageChange}

                />
                )}  
              {(formData.type === 'Video' || formData.type === 'youtube') && (
                <input
                  type="text"
                  placeholder={`Link (e.g., YouTube URL)`}
                  className="w-full border rounded p-2 mb-4"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                />
              )}
              <div className="flex justify-end">
                <button
                 
                  onClick={addMaterial}
                  className="dark:text-white dark:bg-secondary-dark-bg text-gray-800    neu-btn border-2"
           style={{border:`2px solid ${currentColor} `,color:currentColor}}
                >
                  Add
                </button>
                <button
                  
                  onClick={closeModal}
                  className="dark:text-white dark:bg-secondary-dark-bg text-red-600    neu-btn border-2 ml-2"
           style={{border:`2px solid red `}}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <div className="mt-8">
      <div className="grid gap-7 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  p-3">
        {materials.map((material, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded mb-4 shadow-lg border border-blue-500"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-500">
              {material.title}
             
            </h3>
            <p className="text-lg">Type: {material.type}</p>
            <div className="mt-4">
              {material.type === 'PDF' || material.type === 'Notes' ? (
                <a
                  href={material.file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-lg"
                >
                  View PDF
                </a>
              ) : (material.type === 'Video' || material.type === 'YouTube') ? (
                <a
                  href={material.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-lg"
                >
                  View Video
                </a>
              ) : (
                <p className="text-lg text-blue-500 hover:underline">View Notes</p>
              )}
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-4"
              onClick={() => deleteMaterial(material)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      </div> */}
      <div className="mt-8">
  <table className="border-collapse w-full">
    <thead>
      <tr className="bg-cyan-700  text-white">
        <th className="border border-blue-500 px-4 py-2">Title</th>
        <th className="border border-blue-500 px-4 py-2">Type</th>
        <th className="border border-blue-500 px-4 py-2">File</th>
        <th className="border border-blue-500 px-4 py-2">Action</th>
      </tr>
    </thead>
    <tbody>
      {materials.map((material, index) => (
        <tr key={index} className="bg-white">
          <td className="border border-blue-500 px-4 py-2">{material.title}</td>
          <td className="border border-blue-500 px-4 py-2">{material.type}</td>
          <td className="border border-blue-500 px-4 py-2">
            {material.type === 'PDF' || material.type === 'Notes' ? (
              <a
                href={material.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-lg"
              >
                View PDF
              </a>
            ) : (material.type === 'video' || material.type === 'youtube') ? (
              <a
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-lg"
              >
                View Video
              </a>
            ) : (
              <p className="text-lg text-blue-500 hover:underline">View Notes</p>
            )}
          </td>
          <td className='text-center border border-blue-500 px-4 py-2'>
          <button
              className="dark:text-white dark:bg-secondary-dark-bg text-gray-800   mx-auto neu-btn border-2 "
              style={{border:`2px solid red `,color:currentColor}}
              onClick={() => deleteMaterial(material)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Study;

