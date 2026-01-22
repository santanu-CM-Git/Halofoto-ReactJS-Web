import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'
import '../../Common/css/loader.css'

const NotFound = () => {
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
            <div className='container-xxl notfound__content__wrap '>
                <h4 className='button__text'>Page not found</h4>
                <p>
                    Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.
                </p>
                <div className='button__wrap'>
                    <Link to="/">Go to the Home Page</Link>
                </div>
            </div>
        ))
}
export default NotFound