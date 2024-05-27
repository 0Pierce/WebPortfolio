import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Homepage from "/src/pages/HomePage.jsx"
import Contact from "/src/pages/ContactPage.jsx"
import About from "/src/pages/AboutPage.jsx"
import Projects from "/src/pages/ProjectsPage.jsx"

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const mainRouter = createBrowserRouter([

  
  {
    path: "/",
    element: <Homepage/>
  },

  {
    path: "Contact",
    element: <Contact/>
  },
  {
    path: "About",
    element: <About/>
  },
  {
    path: "Projects",
    element: <Projects/>
  },



])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    
  
   <RouterProvider router={mainRouter}/>

  </React.StrictMode>,
)
