import React from 'react'
import Marquee from "react-fast-marquee";
import './skills.css'
import python from './python.svg'
import c from './c.svg'
import html from './html.svg'
import css from './css.svg'
import react from './react.svg'

const skills = () => {
  return (
    <section id="skills">   
        <div className="container skills__container">
          <p className="titles">SKILLS</p>   
            <div className="skill">   
              <div className="pacman">
                <div className="logos">
                  <Marquee
                      gradient={false} 
                      speed={200} 
                      pauseOnHover={true}
                      delay={0}
                      play={true} 
                      direction="left">
                    <div className="path">
                      <img src={python} alt="python"></img>
                      <img src={c} alt="c"></img>
                      <img src={html} alt="html"></img>
                      <img src={css} alt="css"></img>
                      <img src={react} alt="react"></img>
                    </div>
                  </Marquee>
                </div>
              </div>
            </div>
        </div>

    </section>

  )
}

export default skills