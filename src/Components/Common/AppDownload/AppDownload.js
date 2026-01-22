import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import app_store from '../../Image/app_store_logo.svg'
import play_store from '../../Image/play_store_logo.svg'
import './AppDownload.css'
import '../../Common/css/loader.css'

const AppDownload = () => {
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        setTimeout(() => setSpinner(false), 100)
    }, [])

    return (
        spinner ? <div className="loader">
            <div className="outer"></div>
            <div className="middle"></div>
            <div className="inner"></div>
        </div> : (
            <div className='container-xxl download__content__wrap '>
                <div className='button__wrap'>
                    <Link to={`////play.google.com/store/apps/details?id=com.halofoto.halofotoLive`} target='blank'><img src={play_store} /></Link>
                    <Link to={`////apps.apple.com/us/app/halofoto-app/id6474596677`} target='blank'><img src={app_store} /></Link>
                </div>
                <div className='button__text'>Click on the button to download the app</div>
            </div>
        ))
}
export default AppDownload