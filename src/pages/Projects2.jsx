import Gomoku from '../components/projects/proj/Gomoku'
import Clock from '../components/projects/proj/Clock'
import ProjectNav from '../components/nav/ProjectNav'
import {Routes, Route } from 'react-router-dom'
const Projects = () => {
  return (
      <>
      <ProjectNav/>
      <Routes>
        <Route path="/gomoku" element={<><Gomoku/></>}/>  
        <Route exact path="/clock" element={<><Clock/></>}/>    
      </Routes>
      </>
  )
}
  
  export default Projects;
  