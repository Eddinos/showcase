import pp from '../../assets/img/Dino-sir.jpg'
import Duo from '../Duo/Duo'

const Who = () => {
    const picture = (<a href="/resume" className="profilePicture">
                      <img src={pp} alt="dinosir"/>
                    </a>);
    const text = (
      <div className="home-who__bio">
        <h3 className="content-title">Trust me, I'm an engineer</h3>
        <p className="content-text">Basketball legend, web development genius, blabla lorem ipsum lorem ipsum who reads these self-descriptions anyway</p>
      </div>
    );
    return (
      <Duo className="home-who content"
        eltLeft = {picture}
        eltRight = {text}
      />
    )
  }

  export default Who