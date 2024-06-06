import React from 'react'

import { earningData, dropdownData } from "../../data/dummy";
import PieChart from "../../pages/Charts/PieChart";

// import EarningBarChart from "../../Charts/EarningBarChart";
import EarningBarChart from '../../pages/Charts/EarningBarChart'
// import ExpensesBar from "./Charts/ExpensesBar";
import ExpensesBar from '../../pages/Charts/ExpensesBar'
import Calendar from "../../pages/Calendar";

const TeacherLandingPage = () => {
  return (
    <div className="mt-12">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2 p-3"
      
      >
        {/* <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg  rounded-2xl p-3">
          <EarningBarChart />
        </div>
        <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg  rounded-2xl p-3">
          <ExpensesBar />
        </div> */}
        <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg   rounded-2xl p-3">
          <PieChart />
        </div>
        <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg  rounded-2xl p-3 ">
          <Calendar />
        </div>
      </div>
    </div>
  )
}

export default TeacherLandingPage