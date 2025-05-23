import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Pages/App/App';
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Admin from './Pages/Admin/Admin';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
  },
  {
    path: "login",
    element:<Login/>,
  },  
  {
    path: "signup",
    element:<Signup/>,
  },
  {
    path: "admin/*",
    element:<Admin/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
