import React from 'react'
import './contact.css' 
import {HiOutlineMail} from 'react-icons/hi'
import {AiOutlinePhone} from 'react-icons/ai'
import {AiFillGithub} from 'react-icons/ai'
import {AiFillLinkedin} from 'react-icons/ai'
// import ScrollSpy from "react-ui-scrollspy";

function Con(props) {
  return (
    <div className="con">
      <props.icon size={32}/>
      <h2>{props.name}</h2> 
      <h4>{props.text}</h4> 
    </div>
  );
}

const Contact = () => {
  return (
      <section id='contact'>
        <div className="container contact__container">
          <p className="titles">CONTACT</p>
          <div className="contact">
            <div className="contacts">
              <Con icon={HiOutlineMail}name="Email" text="lukaszmlukaszewski@gmail.com"/>
              <Con icon={AiOutlinePhone}name="Phone" text="+48 664915058"/>
              <a href="https://github.com/lukmikas" target="_blank"><Con icon={AiFillGithub}name="Github" text="lukmikas"/></a>
              <a href="https://www.linkedin.com/in/%C5%82ukasz-%C5%82ukaszewski-65a80815a/" target="_blank"><Con icon={AiFillLinkedin}name="Linkedin" text="Łukasz Łukaszewski"/></a>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Contact
