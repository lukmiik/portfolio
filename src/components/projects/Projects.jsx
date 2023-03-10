import React from 'react'
import './projects.css'
import chess from './board.png'
import clock from './clock.png'
import gomoku from './gomoku.png'
import maze from './maze.png'
import {MdKeyboardArrowRight} from 'react-icons/md'

function Pro(props) {
  return (
    <div className="pro">
      <img src={props.img} alt="project"></img>
      <div className="text">
        <div className="texttop">
          <div className="name">{props.name}</div>    
          <div className="description">{props.desc}</div>   
        </div>
        <div className="textbottom">
          <div className="languages">{props.lang}</div>     
          <div className="links">
            <div className="demo_link"><a href={props.link} target="_blank" rel="noreferrer">Demo <div className="icon"><MdKeyboardArrowRight/></div></a></div>
            <div className="code_link"><a href={props.code} target="_blank" rel="noreferrer"><div className="code">Code</div><div className="icon"><MdKeyboardArrowRight/></div></a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Projects = () => {
  const lang_maze = ["Python", "Pygame", "PygBag"]
  const maze_items = lang_maze.map((numbers) =>
    <div className="lang">{numbers}</div>
  );
  const lang_clock = ["Python", "Tkinter"]
  const clock_items = lang_clock.map((numbers) =>
    <div className="lang">{numbers}</div>
  );
  const lang_gomoku = ["C++"]
  const gomoku_items = lang_gomoku.map((numbers) =>
    <div className="lang">{numbers}</div>
  );
  return (
      <section id='projects'>      
        <div className="container projects__container">
          <p className="titles">Projects</p>
          <div className="projects">
            <Pro img={maze} name="Maze" desc="Program generates maze using prims algorithm and can find all paths using backtracking algorithm and shortest path using A* or one of two versions of Dijkstra algorithm" lang={maze_items} link="https://lukmikas.github.io/maze/"  code="https://github.com/lukmikas/maze"/>
            <Pro img={clock} name="Clock" desc="Clock app that besides current time let's user set an alarm and choose a sound and a message. The app also allows user to set a timer and a stopwatch. It also offers light and dark mode." lang={clock_items} link="/clock"  code="https://github.com/lukmikas/clock"/>
            <Pro img={gomoku} name="Gomoku" desc="Gomoku, also known as Five in a Row, is a two-player board game similar to tic-tac-toe but played on a 15x15 grid. The objective of the game is to be the first player to place five stones in a row horizontally, vertically, or diagonally." lang={gomoku_items} link="/gomoku" target="_blank" code="https://github.com/lukmikas/gomoku"/>
          </div>
        </div>
      </section>
  )
}

export default Projects