import { Component } from 'react'
import lyon from '../assets/img/lyon_desktop.jpg'
import lyonMobile from '../assets/img/lyon_mobile.jpg'
import shanghai from '../assets/img/shanghai_desktop.jpg'
import shanghaiWide from '../assets/img/shanghai_wide.jpg'
import shanghaiMobile from '../assets/img/shanghai_mobile.jpg'
import paris from '../assets/img/paris_desktop.jpg'
import parisMobile from '../assets/img/paris_mobile.jpg'
import Banner from '../components/Banner/Banner'
import Who from '../components/Who/Who'
import What from '../components/What/What'
import Contact from '../components/Contact/Contact'
import Layout from '../components/Layout/Layout'
import './Home.scss'

const hometowns = [
  {
    name: 'Lyon',
    src: lyon,
    srcsetXL: lyon,
    srcsetMobile: lyonMobile,
    opacity: 1
  },
  {
    name: 'SH',
    src: shanghai,
    srcsetXL: shanghaiWide,
    srcsetMobile: shanghaiMobile,
    opacity: 0
  },
  {
    name: 'Paname',
    src: paris,
    srcsetXL: paris,
    srcsetMobile: parisMobile,
    opacity: 0
  }
]

export default class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hometown: hometowns[Math.floor(Math.random()*3)]
    };
  }
  
  setCurrentHometown () {
    if (!this.state.hometown) {
      return '';
    }
    if (screen.width < 480) {
      return this.state.hometown.srcsetMobile;
    }
    else if (screen.width < 1440) {
      return this.state.hometown.src;
    }
    return this.state.hometown.srcsetXL;
  }

  componentDidMount () {
    this.setState({
      bgImg: this.setCurrentHometown()
    })
  }

  render () {
    return (
      <Layout>
        <div className="home">
        {this.state.bgImg && <Banner title="Welcome to my sh*t" backgroundImage={`url(${this.state.bgImg})`} />}

        <Who />

        <What currentProject={this.props.currentProject}/>

        <Contact />
      </div>
      </Layout>
    );
  }
}