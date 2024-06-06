import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const Root = () => {
  return (
    <React.StrictMode>
      <ContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ToastContainer />
      </ContextProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));



// import React from 'react';
// // import { createRoot } from 'react-dom';
// import { createRoot } from 'react-dom/client';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './index.css';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import { ContextProvider } from './contexts/ContextProvider';

// // Create a root instance using createRoot
// const root = createRoot(document.getElementById('root'));

// // Render the application within the root instance
// root.render(
//   <React.StrictMode>
//     <ContextProvider>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//       <ToastContainer />
//     </ContextProvider>
//   </React.StrictMode>
// );


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './index.css';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import { ContextProvider } from './contexts/ContextProvider';

// ReactDOM.render(
//   <React.StrictMode>
//     <ContextProvider>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </ContextProvider>
//     <ToastContainer />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );