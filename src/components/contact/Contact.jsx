import React from 'react'
import './contact.css' 
import {HiOutlineMail} from 'react-icons/hi'
import {AiOutlinePhone} from 'react-icons/ai'
import {AiFillGithub} from 'react-icons/ai'
import {AiFillLinkedin} from 'react-icons/ai'
import { useRef } from 'react';
import {GrSend} from 'react-icons/gr'
import emailjs from 'emailjs-com';

function Con(props) {
  return (
    <div className="con">
      <props.icon size={25}/>
      <h2>{props.name}</h2> 
      <h4>{props.text}</h4> 
    </div>
  );
}

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_llbsmye', 'template_j055ten', form.current, 'knvjqKDW0WlhrqueI')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    e.target.reset()
  };

  return (
      <section id='contact'>
        <div className="container contact__container">
          <p className="titles">CONTACT</p>
          <div className="contact">
            <form ref={form} onSubmit={sendEmail}>
                <input type="email" name="email" placeholder="Email" required></input>
                <input type="text" name="subject"  placeholder="Subject" required></input>
                <textarea type="email" name="message" rows="10" placeholder="Message" required></textarea>
                <button type="submit" className="btn send">Send <div className="icon"><GrSend/></div></button>
            </form>
            <div className="contacts">
              <div><Con icon={HiOutlineMail}name="Email" text="lukaszmlukaszewski@gmail.com"/></div>
              <div><Con icon={AiOutlinePhone}name="Phone" text="+48 664915058"/></div>
              <a href="https://github.com/lukmikas" target="_blank" rel="noreferrer"><Con icon={AiFillGithub}name="Github" text="lukmikas"/></a>
              <a href="https://www.linkedin.com/in/%C5%82ukasz-%C5%82ukaszewski-65a80815a/" target="_blank" rel="noreferrer"><Con icon={AiFillLinkedin}name="Linkedin" text="Łukasz Łukaszewski"/></a>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Contact
