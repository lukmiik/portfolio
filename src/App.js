import './App.css';
import About from './components/about/About'
import Projects from './components/projects/Projects'
import Nav from './components/nav/Nav'
import Skills from './components/skills/Skills'
import Contact from './components/contact/Contact'
import Chess from './components/projects/proj/Chess'
import Gomoku from './components/projects/proj/Gomoku'
import Clock from './components/projects/proj/Clock'
import {Routes, Route} from 'react-router-dom'
import ScrollSpy from "react-ui-scrollspy";
function App() {
  return (
    <div className="App">
      <Nav/>
      {/* <ScrollSpy scrollThrottle={100} useBoxMethod={false} > */}
        <Routes>
          <Route exact path="/" element={<><About/><Projects/><Skills/><Contact/></>}/>
          <Route exact path="/about" element={<><About/></>}/>
          <Route exact path="/projects" element={<><Projects/></>}/>
          <Route exact path="/skills" element={<><Skills/></>}/>
          <Route exact path="/contact" element={<><Contact/></>}/>  
          <Route exact path="/chess" element={<><Chess/></>}/>  
          <Route exact path="/gomoku" element={<><Gomoku/></>}/>  
          <Route exact path="/clock" element={<><Clock/></>}/>     
        </Routes>
      {/* </ScrollSpy> */}
    </div>
  );
}

export default App;
