import React from 'react'
import './projectnav.css'
import { BiHomeAlt } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";


const ProjectNav = () => {
  return (
    <div className='pro_nav'>
        <div className="icon">
            <div className="pos">
                <a href={process.env.PUBLIC_URL}><IoArrowBack size={50}/></a>
            </div>
        </div>
    </div>
  )
}

export default ProjectNav