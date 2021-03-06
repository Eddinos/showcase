import React from 'react';
import { Component, PropTypes } from 'react';
import Progress from '../Progress/Progress';
import List from '../List/List';
import Reference from '../Reference/Reference';
import {findDOMNode} from 'react-dom';
import Text from '../Text/Text';
import Link from 'next/link'
import './Project.scss'

export default class Project extends Component {
  constructor (props) {
    super(props);

    let newProject = props.projects[props.projectID-1];
    let errorProject = false;
    if(!newProject) {
      errorProject = true;
    }
    this.state = {
      projectID: props.projectID,
      currentProject: newProject,
      errorProject: errorProject
    }
  }

  componentDidMount () {
    this.getHere();
  }

  getHere () {
    var project = findDOMNode(this);
    var scrollInterval = setInterval(() => {
      window.scrollTo(0, window.scrollY+10);
      if(project.getBoundingClientRect().bottom - window.innerHeight <= 0)
      {
        clearInterval(scrollInterval)
      }
    }, 1)
  }

  componentWillReceiveProps (nextProps) {
    let newProject = nextProps.projects[nextProps.projectID-1];
    if (newProject) {
      this.setState({errorProject: false})
    }
    this.setState({
      projectID: nextProps.projectID,
      currentProject: newProject
    });
  }

  getNavID (direction) {
    let currentID = parseInt(this.props.projectID);
    if (direction === 'left') {
      if (currentID > 1) {
        return currentID - 1;
      }
      else {
        return 1;
      }
    }
    else if (direction === 'right') {
      if (currentID < this.props.projects.length) {
        return currentID + 1;
      }
      else {
        return this.props.projects.length;
      }
    }
  }

  handleTouchMove (e) {
    console.log(e);
  }

  render () {
    return (
      <div className="project" id="project" >
        {this.state.errorProject ? (
          <div className="noProject">
            <div>There is no project for this ID !</div>
            <span>Are you lost ? You should probably go back to the <a href="1">beginning of the list</a></span>
          </div>
        ) :
        (<div>
            <h1 className="title">{this.state.currentProject.title}</h1>
            <div className="description"><Text>{this.state.currentProject.longDescription}</Text></div>
            <Progress percentageValue={this.state.currentProject.completion}/>

            <List technos={this.state.currentProject.technos} />
            <div className="refs">
              <Reference className="source_ref" type="source" url={this.state.currentProject.sourceCode}/>
              <Reference className="link_ref" type="web" url={this.state.currentProject.url}/>
            </div>
            <Link className="arrow arrow-left" to={`/portfolio/project/${this.getNavID('left')}`}>
              <span className="icon-circle-left"></span>
            </Link>
            <Link className="arrow arrow-right" to={`/portfolio/project/${this.getNavID('right')}`}>
              <span className="icon-circle-right"></span>
            </Link>
          </div>)}
      </div>
    )
  }
}
