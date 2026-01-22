import React, { useEffect, useState } from 'react'
import Svg from '../Image/Svg.js';
import { Link } from 'react-router-dom'
import './CallToAction.css'
import Parser from 'html-react-parser';
import '../Common/css/loader.css'
import { STORAGE_BASE_URL } from '../../config/apiConfig'

const CallToAction = props => {
  const homeCtaData = props.homeCtaData  
 
  return (
    <>
    {homeCtaData && (
    <div className='cta__main'>
    <div className='container-xxl'>
      <div className='cta__main__inner'>
      <div className='image__wrap'>
        <img src={`${STORAGE_BASE_URL}/storage/pages/${homeCtaData?.about_background_image}`} alt='' />
      </div>
      <div className='content__wrap'>
        <div className='content__wrap__inner'>
          <h2>{Parser(`${homeCtaData?.about_title}`)}</h2>
          {Parser(`${homeCtaData?.about_content}`)}
        </div>
        <div className="btn__wrapp"><Link to={homeCtaData?.about_url}>About Halofoto
          <i className="ico__box"><Svg /></i>
        </Link>
        </div>
      </div>
      </div>
    </div>
    </div>
    )}
    </>
  );
}

export default CallToAction