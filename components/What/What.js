import Card from '../Card/Card'
import Duo from '../Duo/Duo'

export default (props) => {
    var text = (
      <div className="content-text">
        <h4>My projects</h4>
        <p>Check out my last realization, but also other school and personal works</p>
        <a href='/portfolio' className="moreButton">See more projects</a>
      </div>
    );
    var exemple = props.currentProject ? (
        <a href={`/portfolio/project/${props.currentProject.id}`}>
          <Card
            source={props.currentProject.media}
            title={props.currentProject.title}
            description={props.currentProject.shortDescription}
          />
        </a>
      ) : (
        <WhatPlaceHolder />
      );
    return (
      <Duo className="home-what content"
        eltLeft = {text}
        eltRight = {exemple}
      />
    )
  }

  const WhatPlaceHolder = () => (
    <a href="/portfolio" className="prout">
      <Card
        source="http://www.basketusa.com/wp-content/uploads/2017/02/okafor-1.jpg"
        title="Jahlil Okafor"
        description="Give it time, it's hosted on free servers !"
      />
    </a>
)