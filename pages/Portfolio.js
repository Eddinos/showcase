import React from 'react';
import { Component } from 'react';
import titlePic from '../assets/img/adaptedBasketball.jpg';
import './Portfolio.scss';
import Card from '../components/Card/Card';
import NavLink from '../components/NavLink/NavLink';
import Presenter from '../components/Presenter/Presenter';
import Banner from '../components/Banner/Banner';
import Layout from '../components/Layout/Layout'
// import DataContainer from '../../bonds/DataContainer/DataContainer';
// import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import { connect } from 'react-redux';
// import { getAllProjects } from '../../../actions'

const Intro = () => (
  <div className="intro content-text">
    <h4>Description of my work will be gathered here</h4>
    <span>I've done different shit at school or in my spare time, and I am glad to share it with ya</span>
  </div>
)

export class PortfolioPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    if (this.props.projects && this.props.projects.length === 0) {
      this.props.getProjects();
    }
  }

  renderProjects () {
    let page = this.props.location && this.props.location.pathname;
    if (!this.props.projects) return null
    return (
      <div>
        <Presenter>
          {this.props.projects.map((item, key) => {
              return (
                <Link to={"/portfolio/project/" + item.id} key={key}>
                  <Card
                    source={item.media}
                    title={item.title}
                    description={item.shortDescription}
                  />
                </Link>
              )
            })}
        </Presenter>

        {this.props.children &&
          <div className="project-display">
            <ReactCSSTransitionGroup
              transitionName="swap"
              transitionEnterTimeout={900}
              transitionLeaveTimeout={900}
            >
                {React.cloneElement(React.Children.only(this.props.children), {key: page, projects: this.props.projects })}
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

// const mapStateToProps = (state) => {
//   return {
//     projects: state.projects
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getProjects () {
//       dispatch(getAllProjects())
//     }
//   }
// }

// const Portfolio = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PortfolioPage)

export default PortfolioPage
