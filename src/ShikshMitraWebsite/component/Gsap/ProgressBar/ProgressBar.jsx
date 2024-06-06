import React from 'react'
import './ProgressBar.css'

import { motion } from 'framer-motion';

const ProgressBar = () => {
    // const { motion } = Motion;
    const wrapStyles = {
        indeterminate: {
          x: ["-45%", "45%"],
          transition: {
            //ease: [0.35, 0, 0.2, 1],
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5
          }
        }
      };
      const barStyles = {
        indeterminate: {
          width: ["10%", "50%", "10%"],
          transition: {
           // ease: [0.35, 0, 0.2, 1],
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5
          }
        }
      };
      
  return (
    <div className="wrap z-[999]">
    <motion.div
      className="barWrap"
      animate="indeterminate"
      variants={wrapStyles}
    >
      <motion.div
        className="bar"
        animate="indeterminate"
        variants={barStyles}
      />
    </motion.div>
  </div>
  )
}

export default ProgressBar






// function Animation() {
//   return (
   
//   );
// }

// const element = <Animation />;
// ReactDOM.render(element, document.getElementById("root"));