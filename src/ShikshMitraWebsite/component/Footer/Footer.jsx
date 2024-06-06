import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/SHIKSHAMITRA_logo.png'
const Footer = () => {
  return (
    <>
    <footer className="bg-[#19212c]">
  <div className="max-w-screen-xl px-4 pt-16 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-24">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div>
        <div className="flex justify-center text-teal-300 sm:justify-start">
        <Link to="/">
           <div className="w-[100px]">
           <img
              src={logo}
              alt="Logo"
              className="h-full w-full  scale-125 cursor-pointer  rounded-sm"
            />
           </div>
          </Link>
        </div>

        <p
          className="max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-400 sm:max-w-xs sm:mx-0 sm:text-left"
        >
        A comprehensive institution management system designed to streamline educational processes and enhance communication
        </p>

        <ul className="flex justify-center gap-6 mt-8 md:gap-8 sm:justify-start">
          <li>
         
            <Link
               to="https://www.facebook.com/profile.php?id=100095230572986"
              rel="noopener noreferrer"
              target="_blank"
              title="Facebook"
              className="text-teal-500 transition hover:text-teal-500/75"
            >
              <span className="sr-only">Facebook</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                   fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>

          <li>
            <Link
              to="https://www.instagram.com/corplyxtechnologies/"
              rel="noopener noreferrer"
              target="_blank"
              title="Instagram"
              className="text-teal-500 transition hover:text-teal-500/75"
            >
              <span className="sr-only">Instagram</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                   fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>

          <li>
            <Link
              
              rel="noopener noreferrer"
              to="https://twitter.com/CorplyxTech"
              target="_blank"
              title="Twitter"
              className="text-teal-500 transition hover:text-teal-500/75"
            >
              <span className="sr-only">Twitter</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                />
              </svg>
            </Link>
          </li>

         
        </ul>
      </div>

      <div
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 md:grid-cols-3"
      >
         <div className="text-center sm:text-left">
          <p className="text-lg font-medium text-white">Our Services</p>

          <nav className="mt-8">
            <ul className="space-y-4 text-sm">
              <li>
                <a className="text-white transition hover:text-white/75" href="https://corplyxtechnologies.com/">
                Digital Marketing
                </a>
              </li>

              <li>
                <a className="text-white transition hover:text-white/75" href="https://corplyxtechnologies.com/Websitedevelopment">
                Web Development
                </a>
              </li>

              <li>
                <a className="text-white transition hover:text-white/75" href="https://corplyxtechnologies.com/AppDevelopment">
                App Development
                </a>
              </li>

              <li>
                <a className="text-white transition hover:text-white/75" href="https://corplyxtechnologies.com/SearchEngineOptimization">
                Social Media Optimization
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="text-center sm:text-left">
          <p className="text-lg font-medium text-white">PRIVACY & POLICY</p>

          <nav className="mt-8">
            <ul className="space-y-4 text-sm">
              <li>
                <Link className="text-white transition hover:text-white/75" to="/privacyPolicy">
              T & C
                </Link>
              </li>

              <li>
                <Link className="text-white transition hover:text-white/75" to="/privacyPolicy">
                Legal
                </Link>
              </li>

             

              <li>
                <Link className="text-white transition hover:text-white/75" to="/privacyPolicy">
                  Data
                </Link>
              </li>
              <li>
                <Link className="text-white transition hover:text-white/75" to="/demo">
                  Demo
                </Link>
              </li>
            </ul>
          </nav>
        </div>

       

        {/* <div className="text-center sm:text-left">
          <p className="text-lg font-medium text-white">Helpful Links</p>

          <nav className="mt-8">
            <ul className="space-y-4 text-sm">
              <li>
                <a className="text-white transition hover:text-white/75" href="/">
                  FAQs
                </a>
              </li>

              <li>
                <a className="text-white transition hover:text-white/75" href="/">
                  Support
                </a>
              </li>

              <li>
                <a
                  className="flex group justify-center sm:justify-start gap-1.5"
                  href="/"
                >
                  <span className="text-white transition group-hover:text-white/75">
                    Live Chat
                  </span>

                  <span className="relative flex w-2 h-2 -mr-2">
                    <span
                      className="absolute inline-flex w-full h-full bg-teal-400 rounded-full opacity-75 animate-ping"
                    ></span>
                    <span
                      className="relative inline-flex w-2 h-2 bg-teal-500 rounded-full"
                    ></span>
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div> */}

        <div className="text-center sm:text-left">
          <p className="text-lg font-medium text-white">Contact Us</p>

          <ul className="mt-8 space-y-4 text-sm">
            <li>
              <a
                className="flex items-center justify-center sm:justify-start gap-1.5 group"
                href="/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>

                <span className="text-white transition group-hover:text-white/75">
                support@corplyxtechnologies.com
                </span>
              </a>
            </li>

            <li>
              <a
                className="flex items-center justify-center sm:justify-start gap-1.5 group"
                href="/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>

                <span className="text-white transition group-hover:text-white/75">
                +91 9650388201
                </span>
              </a>
            </li>

            <li
              className="flex items-start justify-center gap-1.5 sm:justify-start"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <address className="-mt-0.5 not-italic text-white">
              Unit-930,I-thum Tower, Noida, Uttar Pradesh
              </address>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="pt-6 mt-12 border-t border-gray-800">
      <div className="text-center sm:flex sm:justify-between sm:text-left">
        <p className="text-sm text-gray-400">
          <span className="block sm:inline"> All rights reserved by Corplyx Technologies.</span>

          {/* <a
            className="inline-block text-teal-500 underline transition hover:text-teal-500/75"
            href="/"
          >
            Terms & Conditions
          </a> */}

          <span>&middot;</span>

          {/* <a
            className="inline-block text-teal-500 underline transition hover:text-teal-500/75"
            href="/"
          >
            Privacy Policy
          </a> */}
        </p>

        <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
          &copy; 2023 eShikshaMitra.
        </p>
      </div>
    </div>
  </div>
</footer>
    </>
  )
}

export default Footer



// import React from "react";
// import logo from "../../assets/image/Shikha.png";
// import { Link } from "react-router-dom";
// function Footer() {
//   const footerStyle = {
//     background: "linear-gradient(to right, #00093c, #2d0b00)",
//     color: "white",
//   };
//   return (
//     <footer
//       className=" bg-slate-100 px-4 divide-y dark:bg-gray-800 dark:text-gray-100"
//       style={footerStyle}
//     >
//       <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0  ">
//         <div className="lg:w-1/3">
//           <a
//             rel="noopener noreferrer"
//             to="#"
//             className="flex justify-center space-x-3 lg:justify-start"
//           >
//             <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-400">
//               <img src={logo} alt="" />
//             </div>
//             <span className="self-center text-2xl font-semibold">
//               eShikshaMitra
//             </span>
//           </a>
//         </div>
//         <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
//           <div className="space-y-3">
//             <h3 className="tracki uppercase dark:text-gray-50">Product</h3>
//             <ul className="space-y-1">
//               <li>
//                 <Link rel="noopener noreferrer" to="/">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link rel="noopener noreferrer" to="/about">
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link rel="noopener noreferrer" to="/contact">
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link rel="noopener noreferrer" to="/screenshot">
//                   Screenshot
//                 </Link>
//               </li>
//               <li>
//                 <Link rel="noopener noreferrer" to="/services">
//                   Services
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="space-y-3">
//             <h3 className="tracki uppercase dark:text-gray-50">Services</h3>
//             <ul className="space-y-1">
//               <li>
//                 <Link
//                   rel="noopener noreferrer"
//                   to="https://corplyxtechnologies.com/"
//                 >
//                   Digital Marketing
//                 </Link>
//               </li>
//               <li>
//                 <Link rel="noopener noreferrer" to="https://www.eshikshamitra.in/">
//                   E-Learning Software
//                 </Link>
//               </li>
//               <li>
//                 <Link rel="noopener noreferrer" to="https://www.eshikshamitra.in/">
//                   School Mobile App
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   rel="noopener noreferrer"
//                   to="https://corplyxtechnologies.com/"
//                 >
//                   Social Media Optimization
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="space-y-3">
//             <h3 className="uppercase dark:text-gray-50">Privacy Policy</h3>
//             <ul className="space-y-1">
//               <li>
//                 <Link rel="noopener noreferrer" to="/privacyPolicy">
//                   T&C
//                 </Link>
//               </li>
//               <li>
//                 <Link rel="noopener noreferrer" to="/privacyPolicy">
//                   Legal
//                 </Link>
//               </li>
//               <li>
//                 <Link rel="noopener noreferrer" to="/privacyPolicy">
//                   Data
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="space-y-3">
//             <div className="uppercase dark:text-gray-50">Social media</div>
//             <div className="flex justify-start space-x-3">
//               <Link
//                 rel="noopener noreferrer"
//                 to="https://www.facebook.com/profile.php?id=100095230572986"
//                 title="Facebook"
//                 className="flex items-center p-1"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 32 32"
//                   className="w-5 h-5 fill-current"
//                 >
//                   <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
//                 </svg>
//               </Link>
//               <Link
//                 rel="noopener noreferrer"
//                 to="https://twitter.com/CorplyxTech"
//                 title="Twitter"
//                 className="flex items-center p-1"
//               >
//                 <svg
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 fill-current"
//                 >
//                   <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
//                 </svg>
//               </Link>
//               <Link
//                 rel="noopener noreferrer"
//                 to="https://www.instagram.com/corplyxtechnologies/"
//                 title="Instagram"
//                 className="flex items-center p-1"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 32 32"
//                   fill="currentColor"
//                   className="w-5 h-5 fill-current"
//                 >
//                   <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z"></path>
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="py-6 text-sm text-center dark:text-gray-400">
//         © 2023 eShikshaMitra. All rights reserved by Corplyx Technologies.
//       </div>
//     </footer>
//   );
// }

// export default Footer;
