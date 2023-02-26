import React from 'react'
import './about.css'
import pic from './mikro.png'
// import ScrollSpy from "react-ui-scrollspy";

const About = () => {
  return ( 
        <section id='about'>
            <div className="container header__container">
                <div className="description">
                    <h3>Hello I'm</h3>
                    <h2>Łukasz Łukaszewski</h2>
                    <h5>I am a student of Computer
                        Science at Cardinal Stefan
                        Wyszyński University in Warsaw. For
                        a couple of years I have been
                        interested in programming.
                    </h5>
                </div>
                <div className="home__img"></div>
                {/* <img src={pic} alt="pic"></img> */}
            </div>
        </section>
  )
}

export default About