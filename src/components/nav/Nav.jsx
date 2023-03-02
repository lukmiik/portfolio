import React, {useState} from "react"
import "./nav.css"
import { HashLink as Link } from 'react-router-hash-link';
import {GiHamburgerMenu} from 'react-icons/gi'

const Nav = () => {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="navbar">   
      <div class="container nav__container">
        <div class="name">Łukasz Łukaszewski</div>  
        <button className="hamburger" onClick={() => {setMobileNav(!mobileNav);}}>
        <div className="icon"><GiHamburgerMenu size={30} /></div></button>
        <div className={mobileNav ? "mobile_links" : "links"}>
          {mobileNav ? (    
            <>     
            <Link to='/#about' className="A" data-to-scrollspy-id="about" onClick={() =>            {setMobileNav(!mobileNav);}}>About</Link>
            <Link to='/#projects' className="A" data-to-scrollspy-id="projects" onClick={() =>            {setMobileNav(!mobileNav);}}>Projects</Link>
            <Link to='/#skills' className="A" data-to-scrollspy-id="skills" onClick={() =>            {setMobileNav(!mobileNav);}}>Skills</Link>
            <Link to='/#contact' className="A" data-to-scrollspy-id="contact" onClick={() =>            {setMobileNav(!mobileNav);}}>Contact</Link>
            </> 
            ): (
            <>
            <Link to='/#about' className="A" data-to-scrollspy-id="about">About</Link>
            <Link to='/#projects' className="A" data-to-scrollspy-id="projects">Projects</Link>
            <Link to='/#skills' className="A" data-to-scrollspy-id="skills">Skills</Link>
            <Link to='/#contact' className="A" data-to-scrollspy-id="contact">Contact</Link>
            </>
          )}
        </div>      
      </div>
    </div>
  );
};

export default Nav;
