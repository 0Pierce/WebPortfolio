import "/src/styles/Header.css"
import * as React from "react";
import { Link } from "react-router-dom";
function Header() {

  return (
    <>


    <div className="headerBody">

      <div className="headerContent">
        <h2>HEADER</h2>

      </div>

    <div className="headerLinks">
        
        
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
            <li><Link to="/Project">Project</Link></li>
            <li><Link to="/About">About</Link></li>
        </ul>
    </div>


      </div>
      </>
  )
}

export default Header