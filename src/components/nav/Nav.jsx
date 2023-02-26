import React from "react"
import "./nav.css"
// import Scrollspy from 'react-scrollspy'
import { HashLink as Link } from 'react-router-hash-link';


const Nav = () => {
  return (
    <div class="container nav__container">
      <div class="name">Łukasz  Łukaszewski</div>  
        <div class="links">
            <Link to='/#about' className="A" data-to-scrollspy-id="about">About</Link>
            <Link to='/#projects' className="A" data-to-scrollspy-id="projects">Projects</Link>
            <Link to='/#skills' className="A" data-to-scrollspy-id="skills">Skills</Link>
            <Link to='/#contact' className="A" data-to-scrollspy-id="contact">Contact</Link>     
        </div>
    </div>
  );
};

export default Nav;
