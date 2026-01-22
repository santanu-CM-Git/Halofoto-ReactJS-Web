import React, { useEffect, useState } from 'react'
import Svg from '../../Image/Svg.js';
import { Link } from 'react-router-dom'
import '../../LandingPage/CallToAction.css'
import Parser from 'html-react-parser';

const AboutCallToAction = props => {
  const homeCtaData = props.aboutCtaData
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 100)
  }, []);

  return (
    spinner ? <div className="loader">
        <div className="outer"></div>
        <div className="middle"></div>
        <div className="inner"></div>
    </div> : (
    <>
    {homeCtaData != undefined &&(
    <div className='cta__main'>
    <div className='container'>
      <div className='cta__main__inner'>
      <div className='image__wrap'>
        <img src={`http://103.191.208.50/~gewlisca/halofoto_new/storage/pages/${homeCtaData.about_image}`} alt='' />
      </div>
      <div className='content__wrap'>
        <div className='content__wrap__inner'>
          <h2>{Parser(`${homeCtaData.about_titles}`)}</h2>
          {Parser(`${homeCtaData.about_product_label}`)}
        </div>
        <div className="btn__wrapp"><Link to={homeCtaData.about_product_url}>Explore Products
          <i className="ico__box"><Svg /></i>
        </Link>
        </div>
      </div>
      </div>
    </div>
    </div>
    )}
    </>
  ));
}

export default AboutCallToAction