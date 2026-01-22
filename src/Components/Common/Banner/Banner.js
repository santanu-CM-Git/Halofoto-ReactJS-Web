import React from 'react'
import { Link } from 'react-router-dom'
import lens from '../../Image/swertwer 1.png'
import './Banner.css'
import { useEffect } from 'react'

const Banner = props => {
    let bannerData = props.bannerData
    useEffect(() => {
        window.scrollTo(0, 0)
      },[])
    return (
        <>
            {typeof bannerData != 'undefined' && bannerData != '' && bannerData.length && bannerData.map(e => (
                <div className="header__banner__inner" key={e.id}>
                    <div className="banner__content">
                        <div className="container">
                            <div className="banner__container__inner">
                                <div className="col-xl-6 col-lg-6 col-md-6">
                                    <div className="bread__crumb">
                                        <ul>
                                            <li><Link to="#">Home</Link></li>
                                            <li><Link to="#">{e.title}</Link></li>
                                        </ul>
                                    </div>
                                    <h1 id='slug'>{e.title}</h1>
                                    <div className="divider__line">&nbsp;</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="image__box">
                        <div className='image__box__inner'>
                            <img src={e.banner_image} alt="" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Banner
