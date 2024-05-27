import "/src/styles/HomePage.css"
import Header from "/src/components/Header.jsx"
import Landing from "/src/components/Landing.jsx"
import { useEffect, useRef } from "react"
import * as THREE from 'three';


function HomePage() {
  const containerRef = useRef(null);

  


  return (
    <>
      <Landing />
      <Header />
      <div className="homePageBody" ref={containerRef}>
      
      </div>
    </>
  );
}

export default HomePage;
