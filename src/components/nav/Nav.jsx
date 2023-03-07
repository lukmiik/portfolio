import React, {useState, useRef, useEffect} from "react"
import "./nav.css"
import { Link } from "react-scroll";

const Nav = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const navRef = useRef(null);
  const [navOffset, setNavOffset] = useState();
  const getHeight= () => {
    const height = navRef.current.clientHeight;
    setNavOffset(height)
  };
  useEffect(()=>{
    getHeight()
  },[]);
  console.log(navOffset)
  useEffect(() => {
    window.addEventListener("resize", getHeight);
  }, []);
  return (
    <div ref={navRef} className="navbar" onClick={() => {setMobileNav(!mobileNav);}}>   
      <div  class="container nav__container">
        <div class="name">
          <a href="/portfolio">
            Łukasz Łukaszewski
          </a>
        </div>  
        <div className="links">
        <Link to='about' className="A" activeClass="active" data-to-scrollspy-id="about" spy={true}  smooth={true} duration={500} isDynamic={true} offset={-navOffset}>About</Link>
        <Link to='projects' className="A" activeClass="active" data-to-scrollspy-id="projects" spy={true} smooth={true} duration={500} isDynamic={true} offset={-navOffset}>Projects</Link>
        <Link to='skills' className="A" activeClass="active" data-to-scrollspy-id="skills" spy={true}  smooth={true} duration={500} isDynamic={true} offset={-navOffset}>Skills</Link>
        <Link to='contact' className="A" activeClass="active" data-to-scrollspy-id="contact" spy={true} smooth={true} duration={500} isDynamic={true} offset={-navOffset}>Contact</Link>
        </div>
        {/* <button className="hamburger" onClick={() => {setMobileNav(!mobileNav);}}>
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
            <Link to='about' className="A" activeClass="active" data-to-scrollspy-id="about"   smooth={true} duration={500} isDynamic={true} offset={-navOffset}>About</Link>
            <Link to='projects' className="A" activeClass="active" data-to-scrollspy-id="projects"  smooth={true} duration={500} isDynamic={true} offset={-navOffset}>Projects</Link>
            <Link to='skills' className="A" activeClass="active" data-to-scrollspy-id="skills"  smooth={true} duration={500} isDynamic={true} offset={-navOffset}>Skills</Link>
            <Link to='contact' className="A" activeClass="active" data-to-scrollspy-id="contact"  smooth={true} duration={500} isDynamic={true} offset={-navOffset}>Contact</Link>
            </>
          )} */}    
      </div>
    </div>
  );
};

export default Nav;
