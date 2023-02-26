import React from 'react'
import './project.css'
import { HashLink as Link } from 'react-router-hash-link';

const Project = (props) => {
  return (
    <div className="project__container">
        <Link to={props.link}>
            <img src={props.img} alt=""></img>
            {/* <h2 className="title">
                {props.title}
            </h2> */}
          </Link>
    </div>

  )
}

export default Project