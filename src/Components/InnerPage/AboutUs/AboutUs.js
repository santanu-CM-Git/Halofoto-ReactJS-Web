import React, { useEffect, useState } from 'react'
import Banner from '../../Common/Banner/Banner'
import HomePageHaloStory from '../../LandingPage/HomePageHaloStory'
import './AboutUs.css'
import LatestNews from '../../LandingPage/LatestNews'
import { HaloFotoApi } from '../../../Api/api'
import Parser from 'html-react-parser';
import AboutCallToAction from './AboutCallToAction'
import '../../Common/css/loader.css'
import { STORAGE_BASE_URL } from '../../../config/apiConfig'

const AboutUs = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    HaloFotoApi.getData('page/about-us').then(
      data => {
        setData(data);
        setTimeout(() => setSpinner(false), 100)
      }
    )
  }, [])

  return (
    spinner ? <div className="loader">
        <div className="outer"></div>
        <div className="middle"></div>
        <div className="inner"></div>
    </div> : (
    <>
      <Banner bannerData={data.banner} />
      <div className='about__us__details'>
        <div className='container'>
          {data?.description && (
            <div className='row'>
              <div className='col-xl-6 col-lg-6'>
                <div className='image__box'>
                  <img src={`${STORAGE_BASE_URL}/storage/pages/${data.description.product_background_image}`} alt='' />
                </div>
              </div>
              <div className='col-xl-6 col-lg-6'>
                <h2>{data.description.about_titles}</h2>
                <div className='divider__line'>&nbsp;</div>
                {Parser(`${data.description.about_contents}`)}
              </div>
            </div>
          )}
        </div>
      </div>
      <AboutCallToAction aboutCtaData={data.description}/>
      <HomePageHaloStory homeStoryTitleData={data.description} homeStoryData={data.story}/>
      <LatestNews homeNewsTitleData={data.description} homenewsData={data.news}/>
    </>
  ))
}

export default AboutUs