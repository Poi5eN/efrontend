import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import axios from 'axios'
import Cookies from 'js-cookie';
const authToken = Cookies.get('token');

function StockTable({ data, handleDelete, updateDependency }) {
  console.log("data", data.sellAmount)
  data.map((item)=>{
    console.log(item.sellAmount)
  })
 
  const [counts, setCounts] = useState({});

  const decrement = (id) => {
    setCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[id] > 0) {
        newCounts[id] -= 1;
      }
      return newCounts;
    });
  };

  const increment = (id) => {
    setCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      newCounts[id] = (newCounts[id] || 0) + 1;
      return newCounts;
    });
  };

  const handleSell = (row) => {
    const sellQuantity = counts[row.id]
    const totalAmount = counts[row.id] * row.price
    const quantity = row.quantity - counts[row.id]
    console.log("sellQuantity", sellQuantity );
    console.log("Totalamount", totalAmount )

    const postData = {
      itemName: row.itemName,
      category: row.category,
      quantity: quantity,
      price: row.price,
      sellQuantity: sellQuantity,
      totalAmount: totalAmount,
      itemId: row._id,

    };
    console.log("POSTDATA---->", postData)
    axios.post("http://localhost:4000/api/v1/inventory/createsellItem", postData,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
      .then((response) => {
        console.log("Sell request successful", response.data);
        setCounts(0)
        updateDependency();
      })
      .catch((error) => {
        console.error("Sell request failed", error);
      });

  };

  const columns = [
    { field: "id", headerName: "S. No.",  flex:1},
    { field: "itemName", headerName: "Item Name", flex:1 },
    { field: "category", headerName: "Category",  flex:1},
    { field: "quantity", headerName: "Quantity",  flex:1 },
    { field: "price", headerName: "Price", flex:1 },
    {field: "sellAmount", headerName: "Total Sale", flex:1},
    {
      field: "actions",
      headerName: "Actions",
     flex:1,
      renderCell: (params) => (
        <div className="flex justify-center items-center">

          <button
            className="w-8 h-8 bg-green-400 text-white rounded-full"
            onClick={() => decrement(params.row.id)}
          >
            -
          </button>

          <p className="px-2">{counts[params.row.id] || 0}</p>
          <button
            className="w-8 h-8 bg-green-400 text-white rounded-full"
            onClick={() => increment(params.row.id)}
          >
            +
          </button>
        </div>
      ),
    },

    {
      field: "amount",
      headerName: "Total Amount",
      width: 100,
      renderCell: (params) => {
 
        const totalAmount = (counts[params.row.id] || 0) * params.row.price;
        console.log("-----------totalAmount", totalAmount)

        return (
          <div className="flex justify-center items-center p-5">
            <p>{totalAmount}</p>
          </div>
        );
      },
    },
    
    
    {
      field: "sell",
      headerName: "Sell",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center items-center">
          <IconButton
            onClick={() => handleSell(params.row)}

            color="primary"
          >
            Sell
          </IconButton>
        </div>
      ),
    },
    
  ];

  const dataWithIds = Array.isArray(data)
    ? data.map((item, index) => ({ id: index + 1, ...item }))
    : [];

  return (

    // <div className="h-[350px]  mx-auto  bg-white mt-2 rounded-md">
    <div className="h-[450px] dark:text-white dark:bg-secondary-dark-bg mx-auto bg-white mt-2 rounded-md overflow-scroll w-full">
    <div className=" min-w-[1000px]  w-full">
      <DataGrid
        rows={dataWithIds}
        columns={columns}

      />
    </div>
    </div>
  );
}

export default StockTable;


