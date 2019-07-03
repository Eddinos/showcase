import React from 'react';
import { Component } from 'react';
import titlePic from '../assets/img/adaptedBasketball.jpg';
import './Portfolio.scss';
import Card from '../components/Card/Card';
import NavLink from '../components/NavLink/NavLink';
import Presenter from '../components/Presenter/Presenter';
import Banner from '../components/Banner/Banner';
import Layout from '../components/Layout/Layout'
import Project from '../components/Project/Project'
// import DataContainer from '../../bonds/DataContainer/DataContainer';
// import { Link } from 'react-router';
import Link from 'next/link'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { getAllProjects } from '../actions'

const Intro = () => (
  <div className="intro content-text">
    <h4>Description of my work will be gathered here</h4>
    <span>I've done different shit at school or in my spare time, and I am glad to share it with ya</span>
  </div>
)

export class PortfolioPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProject: {}
    }
  }

  componentWillMount () {
    // console.log(this.props)
    if (this.props.projects && this.props.projects.length === 0) {
      this.props.getProjects();
    }
  }

  selectProject (project) {
      this.setState({selectedProject: project});
  }

  renderProjects () {
    let page = this.props.location && this.props.location.pathname;
    if (!this.props.projects) return null
    return (
      <div>
        <Presenter>
          {this.props.projects.map((item, key) => {
              return (
                <a onClick={() => this.selectProject(item)} key={key}>
                    <Card
                      source={item.media}
                      title={item.title}
                      description={item.shortDescription}
                    />
                </a>
              )
            })}
        </Presenter>

        {(this.props.projects && this.state.selectedProject) &&
          <div className="project-display">
            <ReactCSSTransitionGroup
              transitionName="swap"
              transitionEnterTimeout={900}
              transitionLeaveTimeout={900}
            >
                <Project projects={this.props.projects} projectID={this.state.selectedProject.id}/>
            </ReactCSSTransitionGroup>
          </div>
        }
      </div>
    )
  }

  render () {
    return (
        <div className="portfolio">
          <Banner
            title="My projects"
            backgroundImage={`url(${titlePic})`}
          />

          <Intro/>

          {this.renderProjects()}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects () {
      dispatch(getAllProjects())
    }
  }
}

const Portfolio = connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioPage)


export default Portfolio
