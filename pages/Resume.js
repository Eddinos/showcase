import React from 'react';
import { Component, PropTypes } from 'react';
import './Resume.scss';
import Skills from '../components/Skills/Skills';
import Duo from '../components/Duo/Duo'
import Banner from '../components/Banner/Banner';
import Slider from '../components/Slider/Slider';
import Experience from '../components/Experience/Experience';
import bannerImg from '../assets/img/venice_desktop.jpg';
// import { getXp, getSkills } from '../../../api'
import { getAllSkills, getAllExperiences } from '../actions'
import {getXp} from '../api'
import { connect } from 'react-redux';
import axios from 'axios'
import Layout from '../components/Layout/Layout'


const PdfLink = (props) => {
  return (
    <a className="pdfLink" href={'/static/cv.pdf'} target="_blank">
      <div className="pdf">
        <span className="icon-file-pdf"></span>
      </div>
    </a>
  )
}
const PdfText = (props) => {
  return (
    <div className="content-text">
      <p>
        As simple as it gets, my resume available as a plain old PDF file
      </p>
    </div>
  )
}
const pdfStyle = {background: '#f9f9f9', padding: '15vh 0'};

class ResumePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: {},
      experiences: []
    }
  }

  static async getInitialProps ({reduxStore, req}) {
    reduxStore.dispatch(getAllExperiences());
    reduxStore.dispatch(getAllSkills());
    
    return {};
  }

  componentDidMount() {
    if (this.props.experiences.length === 0) {
      this.props.getExperiences();
    }
    if (this.props.skills.length === 0) {
      this.props.getSkills();
    }
  }

  createSkillsComponents() {
    let skillsComponents = [];
    let skills = this.props.skills || [];
    for (var type in skills) {
      if (skills.hasOwnProperty(type)) {
        skillsComponents.push(
          <Slider direction="in" side={skills[type].sliderSide} key={type}>
            <Skills skills={skills[type].technos} barStyle={skills[type].barStyle} title={skills[type].title} />
          </Slider>
        )
      }
    }
    return skillsComponents;
  }

  createXpComponents() {
    if (!this.props.experiences) {
      return []
    }
    return this.props.experiences.map((item, key) => {
      let logoCmpnt = <img className="xpLogo" src={`/static${item.logo}`} alt=""/>;
      let description = <Experience data={item} key={key}> banana </Experience>//<div className="content-text">{item.title}</div>;
      var eltLeft = key%2 === 0 ? logoCmpnt : description ;
      var eltRight = key%2 !== 0 ? logoCmpnt : description;
      return (
        <Duo
          style={{padding: '5vh 0'}}
          key={key}
          eltLeft={(() => <Slider direction="in" side="left">{eltLeft}</Slider>)()}
          eltRight={(() => <Slider direction="in" side="right">{eltRight}</Slider>)()}>
        </Duo>
      )
    });
  }

  render () {
    return (
        <div className="resume">
          <Banner title="My resume" backgroundImage={`url(${bannerImg})`} />
          <Duo eltLeft={<PdfText />} eltRight={<PdfLink />} style={pdfStyle}/>
          {this.createSkillsComponents()}
          <h1 className="content-text mid-title mid-title--blue">Work Experiences</h1>
          {this.createXpComponents()}
          <div style={{height: '200px'}}></div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    skills: state.skills,
    experiences: state.experiences
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSkills () {
      dispatch(getAllSkills())
    },
    getExperiences () {
      dispatch(getAllExperiences())
    }
  }
}

const Resume = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResumePage)

export default Resume
