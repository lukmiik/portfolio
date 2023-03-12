import React, {useState, useRef, useEffect} from "react"
import useScrollListener from "./hooks/useScrollListener";
import "./nav.css"
import { Link } from "react-scroll";

const Nav = () => {
  const [navClassList, setNavClassList] = useState([]);
  const scroll = useScrollListener();

  useEffect(() => {
    const _classList = [];

    if (scroll.y > 50 && scroll.y - scroll.lastY > 0)
      _classList.push("navbar_hidden");
    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY]);

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
    <nav ref={navRef} className={navClassList.join("")}>   
      <div  class="container nav__container">
        <div class="name">
          <a href={process.env.PUBLIC_URL}>
            Łukasz Łukaszewski
          </a>
        </div>  
          <div className="links">
            <Link to='about' className="A" activeClass="active" data-to-scrollspy-id="about" smooth={true} duration={500} isDynamic={true} offset={-navOffset}>About</Link>
            <Link to='projects' className="A" activeClass="active" data-to-scrollspy-id="projects" smooth={true} duration={500} isDynamic={true} offset={-navOffset}>Projects</Link>
            <Link to='skills' className="A" activeClass="active" data-to-scrollspy-id="skills"   smooth={true} duration={500} isDynamic={true} offset={-navOffset}>Skills</Link>
            <Link to='contact' className="A" activeClass="active" data-to-scrollspy-id="contact"  smooth={true} duration={500} isDynamic={true} offset={-navOffset}>Contact</Link>
          </div>    
      </div>
    </nav>
  );
};

export default Nav;
