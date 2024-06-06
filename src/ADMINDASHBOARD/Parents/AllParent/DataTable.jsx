import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function DynamicDataTable({data , handleDelete}) {

    const columns = [
      { field: "id", headerName: "S. No." , width:50 },
      { field: "email", headerName: "Email", flex:1 },
      { field: "fullName", headerName: "Father Name" ,flex:1 },
      { field: "motherName", headerName: "Mother Name" , flex:1 },
      { field: "contact", headerName: "Contact", flex:1 },
      ];


  const dataWithIds = Array.isArray(data) ? data.map((item, index) => ({ id: index + 1, ...item})) : [];
  return (
  
    // <div className="h-[350px]  mx-auto  bg-white mt-2 rounded-md">
    <div className="h-[450px] dark:text-white dark:bg-secondary-dark-bg mx-auto bg-white mt-2 rounded-md overflow-scroll w-full">
    <div className=" min-w-[1000px]  w-full">
      <DataGrid
        rows={dataWithIds}
        columns={columns}
        className="dark:text-white dark:bg-secondary-dark-bg  mx-auto bg-white"
      />
    </div>
    </div>
  );
}

export default DynamicDataTable;