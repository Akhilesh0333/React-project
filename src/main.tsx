import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Index from './router/Index';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Index />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      limit={1}
    />
  </React.StrictMode>,
)
