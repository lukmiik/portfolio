import './App.css';
import About from './components/about/About'
import Projects from './components/projects/Projects'
import Nav from './components/nav/Nav'
import Skills from './components/skills/Skills'
import Contact from './components/contact/Contact'
import Gomoku from './components/projects/proj/Gomoku'
import Clock from './components/projects/proj/Clock'
import Maze from './components/projects/proj/Maze'
import {Routes, Route,BrowserRouter } from 'react-router-dom'
import ScrollSpy from "react-ui-scrollspy";
function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Nav/>
        <ScrollSpy scrollThrottle={100} useBoxMethod={false} offsetTop={200} offsetBottom={100}>
          <Routes>
            <Route exact path="/" element={<><About/><Projects/><Skills/><Contact/></>}/>
            <Route exact path="/gomoku" element={<><Gomoku/></>}/>  
            <Route exact path="/clock" element={<><Clock/></>}/>     
            <Route exact path="/maze" element={<><Maze/></>}/>  
          </Routes>
        </ScrollSpy>
      </div>
    </BrowserRouter>
  );
}

export default App;
