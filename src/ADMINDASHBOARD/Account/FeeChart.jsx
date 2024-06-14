// FeeChart
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from 'axios';
import Cookies from 'js-cookie';
const authToken = Cookies.get('token');

const FeeChart = () => {
  const [chartData, setChartData] = useState({ categories: [], series: [] });
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  const [totalDues, setTotalDues] = useState(0);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/v1/fees/getFeeStatus`,
        {
          withCredentials: true,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
        }
      )
      .then((response) => {
        const totalAmount = response.data.data;

        let monthlyPaidAmounts = {};

        totalAmount.forEach((total) => {
          if (total.feeHistory && total.feeHistory.length > 0) {
            total.feeHistory.forEach((fee) => {
              const paidAmount = Number(fee.paidAmount || 0);
              const month = fee.month; // Assuming there's a 'month' property in fee

              // Initialize the sum for the month if it doesn't exist
              if (!monthlyPaidAmounts[month]) {
                monthlyPaidAmounts[month] = { paid: 0, dues: 0 };
              }

              // Add the paidAmount and dues to the sum for the month
              monthlyPaidAmounts[month].paid += paidAmount;
              monthlyPaidAmounts[month].dues += total.dues || 0;
            });
          }
        });

        const categories = Object.keys(monthlyPaidAmounts);
        const paidSeries = Object.values(monthlyPaidAmounts).map((data) => data.paid);
        const duesSeries = Object.values(monthlyPaidAmounts).map((data) => data.dues);
        

        setChartData({
          categories,
          series: [
            { name: 'Paid', data: paidSeries },
            { name: 'Dues', data: duesSeries },
          ],
        });

        // Calculate and log the total paid amount
        const totalPaid = paidSeries.reduce((total, amount) => total + amount, 0);
        setTotalPaidAmount(totalPaid);
        console.log("Total Paid Amount:", totalPaid);

        // Calculate and log the total dues
        const totalDue = duesSeries.reduce((total, amount) => total + amount, 0);
        setTotalDues(totalDue);
        console.log("Total Dues:", totalDue);
      })
      .catch((error) => {
        console.error("Error fetching Fees data: ", error);
      });
  }, []);

  const options = {
    series: chartData.series || [],
    chart: {
      type: 'bar',
      height: 350,
    },
    // title: {
    //   text: "Fees",
    //   className: "text-2xl font-bold text-cyan-700",
    // },
    xaxis: {
      categories: chartData.categories || [],
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'right',
      offsetX: 0,
      offsetY: 50,
    },
  };

  return (
    <div id="chart">
      <h1 className="dark:text-white dark:bg-secondary-dark-bg text-xl py-2">Fees</h1>
      <ReactApexChart options={options} series={options.series} type="bar" height={350} />
    </div>
  );
};

export default FeeChart;