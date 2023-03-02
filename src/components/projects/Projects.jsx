import React from 'react'
import './projects.css'
import chess from './board.png'
import clock from './clock.png'
import gomoku from './gomoku.png'
import maze from './maze.png'
import { HashLink as Link } from 'react-router-hash-link';

function Pro(props) {
  return (
    <div className="pro">
      <div className="name">{props.name}</div>
      <img src={props.img} alt="project"></img>   
      <div className="links">
        <div className="demo_link"><Link to={props.link}>Demo</Link></div>
        <div className="code_link"><a href={props.code} target="_blank" rel="noreferrer">Code</a></div>
      </div>
    </div>
  );
}

const Projects = () => {
  return (
      <section id='projects'>      
        <div className="container projects__container">
          <p className="titles">PROJECTS</p>
          <div className="projects">
            <Pro link="/chess" img={chess} name="Chess" code="https://github.com/lukmikas"/>
            <Pro link="/gomoku" img={gomoku} name="Gomoku" code="https://github.com/lukmikas/gomoku"/>
            <Pro link="/clock" img={clock} name="Clock" code="https://github.com/lukmikas/clock"/>
            <Pro link="/maze" img={maze} name="Maze" code="https://github.com/lukmikas/maze"/>
          </div>
        </div>
      </section>
  )
}

export default Projects