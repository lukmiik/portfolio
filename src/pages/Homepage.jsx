import About from '../components/about/About'
import Projects from '../components/projects/Projects'
import Nav from '../components/nav/Nav'
import Skills from '../components/skills/Skills'
import Contact from '../components/contact/Contact'
import {Routes, Route} from 'react-router-dom'
const Homepage = () =>  {
  return (
    <>
    <Nav/>
    <Routes>
    <Route exact path="/" element={<><About/><Projects/><Skills/><Contact/></>}/>
    </Routes>
    </>
  );
}

export default Homepage;
