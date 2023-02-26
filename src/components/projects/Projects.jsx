import React from 'react'
import './projects.css'
import Project from './Project'
import chess from './board.png'
import clock from './clock.avif'
import gomoku from './unnamed.png'
// import ScrollSpy from "react-ui-scrollspy";

const Projects = () => {
  return (
      <section id='projects'>      
        <div className="container projects__container">
          <p className="titles">PROJECTS</p>
          <div className="projects">
            <Project link="/chess" img={chess} title="Chess"/>
            <Project link="/gomoku" img={gomoku} title="Gomoku"/>
            <Project link="/clock" img={clock} title="Clock"/>
          </div>
        </div>
      </section>
  )
}

export default Projects