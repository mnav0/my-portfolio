import React from 'react';
import profile from '../../assets/profile.png';
import pinkCircle from '../../assets/logo-lg-pink.png';
import yellowCircle from '../../assets/logo-lg-yellow.png';
import blueCircle from '../../assets/logo-lg-blue.png';
import './styles.css';
import resume from '../../assets/resume.pdf';
import { NavLink } from 'react-router-dom';

const About = () => {
    return (
        <div className="about-all">
            <div className="about-picture">
                <div className="circles">
                    <img src={blueCircle} alt="Blue circle" className="blue-circle"/>
                    <img src={yellowCircle} alt="Yellow circle" className="yellow-circle"/>
                    <img src={pinkCircle} alt="Pink circle" className="pink-circle"/>
                    <img src={profile} alt="Profile" className="profile" />
                </div>
            </div>
            <div className="about-text">
                <h1>hi, i’m maggie!</h1>
                <p>I grew up in Cleveland, Ohio, and am currently studying Computer Science and Interaction Design at Northeastern University in Boston, MA.</p>
                <p>By applying the creative processes I’ve learned through my background in fine arts, I aim to explore the use of technology as both an inspiration and a tool to produce engaging and intuitive user experiences.</p>
                <p>Some more things that make me happy: live music, art museums, yoga, playing piano, and learning French.</p>
                <p>I am currently working as a Software Engineer Co-op at <a className="meiday-link" href="http://meiday.health/" target="_blank" rel="noopener noreferrer">Meiday Health</a>, and I'm searching for full-time internship opportunities from May to August of 2021.</p>
                <p>Please feel free to contact me through email (mnavracruz@gmail.com) or view some examples of my work using the information below!</p>
                <a href={resume} target="_blank" rel="noopener noreferrer">
                <div className="resume-button">
                    <p>RESUME</p>
                    <div className="line"></div>
                    <div className="arrow"></div>
                </div>
                </a>
                <a href="https://github.com/mnav0" target="_blank" rel="noopener noreferrer">
                <div className="github-button">
                    <p>github</p>
                    <div className="line"></div>
                    <div className="arrow"></div>
                </div>
                </a>
                <a href="https://www.linkedin.com/in/mnavracruz/" target="_blank" rel="noopener noreferrer">
                <div className="linkedin-button">
                    <p>LINKEDIN</p>
                    <div className="line"></div>
                    <div className="arrow"></div>
                </div>
                </a>
                <NavLink to="/design">
                    <div className="design-button">
                        <p>design work</p>
                        <div className="line"></div>
                        <div className="arrow"></div>
                    </div>
                </NavLink>
                <NavLink to="/develop">
                    <div className="develop-button">
                        <p>developer work</p>
                        <div className="line"></div>
                        <div className="arrow"></div>
                    </div>
                </NavLink>
                
            </div>
        </div>
        
    );
};

export default About;