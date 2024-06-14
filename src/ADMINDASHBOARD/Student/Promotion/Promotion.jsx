import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useStateContext } from "../../../contexts/ContextProvider.js";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const authToken = Cookies.get("token");

const Promotion = () => {
  // Fetch data from global context
  console.log(authToken);
  const { allstudentdata, currentColor } = useStateContext();

  const [selectionModel, setSelectionModel] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState([]);
  const [classAnchorEl, setClassAnchorEl] = useState(null);
  const [sectionAnchorEl, setSectionAnchorEl] = useState(null);

  const [promoteClass, setPromoteClass] = useState("");
  const [promoteSection, setPromoteSection] = useState("");
  const [promoteClassAnchorEl, setPromoteClassAnchorEl] = useState(null);
  const [promoteSectionAnchorEl, setPromoteSectionAnchorEl] = useState(null);
  const [error, setError] = useState(null);

  // const [class, setClass] = useState([]);
  const [apiclass, setApiclass] = useState([]);
  const [apisection, setApisection] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  // Created for testing
  const [meta, setMeta] = useState();
  const [apiData, setApiData] = useState([]);
  // set the studentdata
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    axios
      .get(
        "http://localhost:4000/api/v1/adminRoute/getAllClass",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (Array.isArray(response.data.classList)) {
          //   // Extract class names from the response
          const classNames = response.data.classList.map(
            (classData) => classData.className
          );
          // const classNames = response.data.classList;
          const classSection = response.data.classList.map(
            (classData) => classData.section
          );
        
          setApiData(response.data.classList);

          setApiclass(classNames);
          setApisection(classSection);
          console.log(response);
        } else {
          setError("Data format is not as expected.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
      });
  }, [shouldFetchData]);

  // Extra console in useEffects
  console.log("All student data created by admin ", allstudentdata);
  console.log("Api data that for selecting class and sectio ", apiData);
  console.log("To set api class dynamically ", apiclass);
  console.log("To set api class section  dynamically ", apisection);

  const customButtonStyle = {
    backgroundColor: currentColor, // Change this to the color you desire
  
  };

  
  const classSections = apiData.map((data) => ({
    class: data.className,
    sections: data.section,
  }));

  // Static columns
  const columns = [
    { field: "id", headerName: "Select All", type: "checkbox", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "rollNumber", headerName: "Roll Number", flex: 1 },
    { field: "class", headerName: "Class", flex: 1 },
  ];

  const handleClassChange = (event, classData) => {
    // set the section if it the classdata match with apidata and the section in the api data related to the classs other wise set it to null
    const selectedSection = getSelectedSection(classData);
    console.log("Selected sections ", selectedSection);
    console.log("Class data ", classData);
    setApisection(selectedSection);
    // setSelectedSection()
    setSelectedClass(classData);
    setSectionAnchorEl(event.currentTarget);
  };

  function getSelectedSection(classData) {
    const matchingData = apiData.find((data) => data.className === classData);
    if (matchingData) {
      // If a matching class is found, return its section
      const filteredStudentData = allstudentdata.filter(
        (student) => student.className === classData
      );
      setStudentData(filteredStudentData);
      return matchingData.section; // Assuming there is only one section in the array
    }
    // If no matching class is found, return null or a default value
    return null;
  }

  const handleSectionChange = (section, selectedClass) => {
 

    console.log("Handle Section Change ki selected Class", selectedClass);
    console.log("Handle Section Change ki selected section ", section);

    const matchingData = allstudentdata.filter((object) => {
      return object.class === selectedClass && object.section === section;
    });

    console.log("matched data ", matchingData);
    const formattedData = matchingData.map((object) => ({
      id: object._id,
      name: object.fullName,
      rollNumber: object.rollNo,
      class: object.class,
    }));

    setStudentData(formattedData);
   
    console.log("Working on data ", section);
  
    setSelectedSection(section);
    // Close the section anchor element (if you're using a dropdown or popover)
    setSectionAnchorEl(null);
  };

  const handlePromoteClassChange = (event, classData) => {
    setPromoteClass(classData.class);
    setPromoteSectionAnchorEl(event.currentTarget);
  };

  const handlePromoteSectionChange = (section) => {
    setPromoteSection(section);
    setPromoteSectionAnchorEl(null);
  };

  const handleMenuClose = () => {
    setClassAnchorEl(null);
    setSectionAnchorEl(null);
    setPromoteClassAnchorEl(null);
    setPromoteSectionAnchorEl(null);
  };
  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
    console.log("Checked elements: in ", newSelection);
  };
  
  const handlePromoteClick = async () => {
    // Get the selected student's ID, promoted section, and promoted class
    const studentId = selectionModel; // Replace this with the actual way you obtain the selected student's ID
    const promotedSection = promoteSection; // Replace with your logic to get the promoted section
    const promotedClass = promoteClass; // Replace with your logic to get the promoted class

    if (studentId.length === 0) {
      console.error("No students selected for promotion");
      return;
    }
    // Prepare the data to send in the PUT request
    const dataToUpdate = {
      students: studentId,
      promotedClass: promotedClass,
      promotedSection: promotedSection,
    };

    // Make the PUT request
    await axios
      .put(
        "http://localhost:4000/api/v1/adminRoute/promotionOfStudent",
        dataToUpdate,
        {
          withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
        }
      )
      .then((response) => {
        // Handle the response from the server
        toast.success("Student promotion successfully");

        const unMatchingData = studentData.filter((object) => {
          return !dataToUpdate.students.includes(object.id);
        });

        setStudentData(unMatchingData);

        console.log(
          "Promotion Successful:",
          response.data,
          "Promoted class",
          promoteClass,
          "Promoted Section ",
          promotedSection
        );
      })
      .catch((error) => {
        // Handle errorscd c
        toast.error("Student promotion  failed");
        console.error("Promotion Failed:", error);
      });
  };


  // console.log("selectionModel : ", selectionModel);
  // console.log("Promoted Class : ", promoteClass);
  // console.log("Promoted Section  : ", promoteSection);
  return (
    <div className=" mt-12 md:mt-1  mx-auto p-3">
      <h1 
      className="text-4xl font-bold mb-4 uppercase text-center  hover-text "
      style={{color:currentColor}}
      >
        Student Promotion
      </h1>

      <div className="flex space-x-4">
        <div className="w-1/2">
          <h3 className="text-lg font-semibold dark:text-white  ">Class</h3>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={customButtonStyle}
            onClick={(event) => {
              setClassAnchorEl(event.currentTarget);
              setSectionAnchorEl(null);
              
            }}
          >
            {selectedClass
              ? `${selectedClass} - ${selectedSection}`
              : "Select Class and Section"}
          </Button>
          <Popover
            anchorEl={classAnchorEl}
            open={Boolean(classAnchorEl)}
            onClose={handleMenuClose}
          >
            <List>
              {apiclass.map((classData) => (
                <ListItem
                  key={classData}
                  onClick={(event) => handleClassChange(event, classData)}
                >
                  <ListItemText primary={classData} />
                </ListItem>
              ))}
            </List>
          </Popover>
          <Popover
            anchorEl={sectionAnchorEl}
            open={Boolean(sectionAnchorEl)}
            onClose={handleMenuClose}
          >
            <List>
              
              {apisection.map((section) => (
                <ListItem
                  key={section}
                  onClick={() => handleSectionChange(section, selectedClass)}
                >
                  <ListItemText primary={section} />
                </ListItem>
              ))}
            </List>
          </Popover>
        </div>
        <div className="w-1/2">
          <h3 className="text-lg font-semibold  dark:text-white ">Promote</h3>
          <Button
            variant="contained"
            color="primary"
            style={customButtonStyle}
            fullWidth
            onClick={(event) => {
              setPromoteClassAnchorEl(event.currentTarget);
              setPromoteSectionAnchorEl(null);
            }}
          >
            {promoteClass
              ? `${promoteClass} - ${promoteSection}`
              : "Select Promote Class and Section"}
          </Button>
          <Popover
            anchorEl={promoteClassAnchorEl}
            open={Boolean(promoteClassAnchorEl)}
            onClose={handleMenuClose}
          >
            <List>
              {classSections.map((classData) => (
                <ListItem
                  button
                  key={classData.class}
                  onClick={(event) =>
                    handlePromoteClassChange(event, classData)
                  }
                >
                  <ListItemText primary={classData.class} />
                </ListItem>
              ))}
            </List>
          </Popover>
          <Popover
            anchorEl={promoteSectionAnchorEl}
            open={Boolean(promoteSectionAnchorEl)}
            onClose={handleMenuClose}
          >
            <List>
              {classSections
                .find((classData) => classData.class === promoteClass)
                ?.sections.map((section) => (
                  <ListItem
                    button
                    key={section}
                    onClick={() => handlePromoteSectionChange(section)}
                  >
                    <ListItemText primary={section} />
                  </ListItem>
                ))}
            </List>
          </Popover>
        </div>
      </div>

      <div
        style={{
          height: 400,
          width: "100%",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        {/* <DataGrid rows={studentData} columns={columns} checkboxSelection /> */}
        <div className=" dark:bg-[#999b9e] ">
          <DataGrid
            rows={studentData}
            columns={columns}
            checkboxSelection
            selectionModel={selectionModel}
            onRowSelectionModelChange={handleSelectionModelChange}
            // getRowId={(row) => row._id} // Specify a custom ID field
          />
        </div>
      </div>

      <div className="w-1/2">
        <Button
          variant="contained"
          color="primary"
          style={customButtonStyle}
          fullWidth
          onClick={handlePromoteClick}
        >
          Update Session
        </Button>
      </div>
    </div>
  );
};

export default Promotion;
