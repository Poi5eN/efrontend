// import React, { useState, useEffect } from "react";
// import "./Testimonial.css";

// const Testimonial = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const testimonials = [
//     {
//       name: "Aman Sharma",
//       image:
//         "https://i.ibb.co/qWPsKHT/amanimg.jpg",
//       text: "Our school management system has been a transformative tool. It seamlessly handles administrative tasks, empowering our educators to focus on teaching. It's user-friendly,and it has truly elevated our school's operational efficiency.",
//     },
//     {
//       name: "Chhaya Sengar",
//       image:
//         "https://i.ibb.co/nfn6hMH/Chhaya.jpg",
//       text: "Implementing this management system was a game-changer for our school. It's highly efficient and simplifies tasks for administrators, reducing the learning curve and improving productivity.",
//     },
//     {
//       name: "Anand Jaiswal",
//       image:
//         "https://i.ibb.co/RcThCZ3/annadimg.jpg",
//       text: "This system revolutionized our school's communication and organization. Information flows seamlessly, creating a connected learning community and providing a platform for real-time updates that benefit our students, parents, and staff.",
//     },
//     {
//       name: "Badal Kumar",
//       image:
//         "https://i.ibb.co/5vmWpqX/Badal.jpg",
//       text: "An essential tool for modern schools, it's transformed how we manage everything. Our administrative processes, student records, and resource allocation are now more efficient and ensuring we're well-prepared for the future.",
//     },
//     {
//       name: "Parveen Pal",
//       image:
//         "https://i.ibb.co/rtJwmxJ/praveenimg.jpg",
//       text: "Parents and staff adore the transparency and convenience offered by this system. It empowers parents to monitor their children's progress and school-related updates easily.This system strengthens our school community.",
//     },
//     {
//       name: "Ajay Raj",
//       image:
//         "https://i.ibb.co/crfqLHp/ajayimage.jpg",
//       text: "Effortlessly managing student data, attendance, and resources, this system is an invaluable asset to our institution. It saves time, optimizes resource allocation, and customizes our educational approach. It's not just a tool.",
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//     }, 3000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [activeIndex, testimonials.length]);

//   return (
//     <div className="my-2">
//       <h2 className="head3">Testimonials</h2>
//       <div className="underline-testimonial">
//         <span></span>
//       </div>
//       <div className="testi-button">
//         See more happy faces <span>By clicking on the bubbles</span>
//       </div>
//       <section className="op-section op-eight-section section" id="">
//         <div className="ocean-2">
//           <div className="wave-2"></div>
//           <div className="wave-2"></div>
//         </div>
//         <div className="section-eight">
//           <div className="col-md-3 col-sm-3">
//             <div className="container-pe-quote left">
//               {testimonials.map((testimonial, index) => (
//                 <div
//                   key={index}
//                   className={`pp-quote li-quote-${index + 1} ${
//                     activeIndex === index ? "active" : ""
//                   }`}
//                   onClick={() => setActiveIndex(index)}
//                 >
//                   <img src={testimonial.image} alt="" />
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="col-md-6 col-sm-6">
//             <div className="sec-eight-text-area">
//               <div className="container-dp-name">
//                 {testimonials.map((testimonial, index) => {
//                   return (
//                     <div
//                       key={index}
//                       className={`box-dpname dp-name-${index + 1} ${
//                         activeIndex === index ? "look" : "hide-dp-top"
//                       }`}
//                     >
//                       <img
//                         src={testimonial.image}
//                         alt=""
//                         style={{
//                           width: "100px",
//                           height: "100px",
//                           borderRadius: "50%",
//                         }}
//                       />
//                       <h1>{testimonial.name}</h1>
//                       <div className="text-para w-[50%]">
//                         <p>{testimonial.text}</p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Testimonial;

import React from "react";
import "./Testimonial.css";
const Testimonial = () => {
  return (
    <div className="bg-[#1f2937] text-gray-100 sm:px-8 py-12">
      <div className="text-center w-full"></div>
      <div className="relative max-w-screen-xl  px-8 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-[#1f2937]  sm:rounded-lg shadow-lg">
        <div className="absolute right-0 bottom-0 hero-pattern w-64 h-56"></div>
        <div className="relative">
          <div className="pb-16">
            <div
              id="text"
              className="md:text-2xl text-center uppercase bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-[#0e7490] text-5xl font-black py-5"
            >
              {" "}
              TESTIMONIALS
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:mx-12">
            <div className="relative mx-auto mt-8 rounded-lg shadow max-w-sm p-10 bg-gray-100 text-gray-700 leading-snug flex flex-col justify-between">
              <div className="-ml-4">
                {/* <svg className="w-8 opacity-25 text-indigo-500" xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality"
              fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0
                                                                                                             640 640"
              fill=currentColor>
              <path
                d="M557.133 561.704H442.128c-44.256 0-80.458-36.19-80.458-80.446 0-165.58-42.32-347.485 160.656-399.418 91.95-23.516 115.915 77.753 18.119 84.745-59.647 4.276-71.293 42.804-73.147 101.068h92.269c44.256 0 80.458 36.201 80.458 80.458v130.702c0 45.591-37.3 82.89-82.891 82.89zm-358.032 0H84.096c-44.256 0-80.446-36.19-80.446-80.446 0-165.58-42.331-347.485 160.644-399.418 91.95-23.516 115.915 77.753 18.118 84.745-59.646 4.276-71.292 42.804-73.146 101.068h92.269c44.256 0 80.457 36.201 80.457 80.458v130.702c0 45.591-37.3 82.89-82.89 82.89z" />
            </svg> */}
              </div>
              <div className="mt-2">
                "The school management system implemented by eShikshaMitra has
                strengthened our institution's operational efficiency and
                accountability. We now have better insights into enrollment
                trends, financial data, and resource allocation, allowing us to
                make data-driven decisions that support our strategic goals. It
                has been instrumental in fostering growth and sustainability for
                our school."
              </div>
              <div>
                <div className="mx-auto w-full border border-gray-300 my-8"></div>
                <div className="flex items-center">
                  <div>
                    <img
                      className="w-12 h-12 rounded-full border-2 border-indigo-400"
                      src="https://www.spencerclarkegroup.co.uk/uploads/5005001.png"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="font-bold"> Dr. Anitha Bijesh</div>
                    <div className="text-sm text-gray-600 mt-1">
                      principal
                      {/* <a href="https://timerse.com/7-steps-to-boost-your-metabolism/">
                        Boosting Metabolism
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-8 rounded-lg shadow max-w-sm p-10 bg-gray-100 text-gray-700 leading-snug flex flex-col justify-between">
              <div className="-ml-4">
                {/* <svg className="w-8 opacity-25 text-indigo-500" xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality"
              fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0
                                                                                                             640 640"
              fill=currentColor>
              <path
                d="M557.133 561.704H442.128c-44.256 0-80.458-36.19-80.458-80.446 0-165.58-42.32-347.485 160.656-399.418 91.95-23.516 115.915 77.753 18.119 84.745-59.647 4.276-71.293 42.804-73.147 101.068h92.269c44.256 0 80.458 36.201 80.458 80.458v130.702c0 45.591-37.3 82.89-82.891 82.89zm-358.032 0H84.096c-44.256 0-80.446-36.19-80.446-80.446 0-165.58-42.331-347.485 160.644-399.418 91.95-23.516 115.915 77.753 18.118 84.745-59.646 4.276-71.292 42.804-73.146 101.068h92.269c44.256 0 80.457 36.201 80.457 80.458v130.702c0 45.591-37.3 82.89-82.89 82.89z" />
            </svg> */}
              </div>
              <div className="mt-2">
                "As a busy administrator, I cannot imagine managing our school
                without eShikshaMitra's comprehensive management system. It has
                simplified our day-to-day tasks, from attendance tracking to
                payroll management, and has improved communication across
                departments. This system has undoubtedly elevated our school's
                operational excellence."
              </div>
              <div>
                <div className="mx-auto w-full border border-gray-300 my-8"></div>
                <div className="flex items-center">
                  <div>
                    <img
                      className="w-12 h-12 rounded-full border-2 border-indigo-400"
                      src="https://www.forbes.com/advisor/wp-content/uploads/2023/06/teacher-and-students.jpeg.jpg"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="font-bold"> Dr. Anuja Rao</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Teacher, <a href="https://swift.org/">Java</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
