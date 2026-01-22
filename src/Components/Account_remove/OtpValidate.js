import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer, Slide } from 'react-toastify';
import './OtpValidate.css'
import '../Common/css/loader.css'
import eye from '../Image/eye.svg'
import eye_close from '../Image/eye_close.svg'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const OtpValidate = () => {
  
    const location = useLocation()
    const [spinner, setSpinner] = useState(true)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [otp, setOtp] = useState()
    const [email, setEmail] = useState()
    
    // useEffect(() => {
    //     setTimeout(() => setSpinner(false), 100)
    // }, [])

    useEffect(() => {
        setEmail(location?.state?.email || ''); 
        setTimeout(() => setSpinner(false), 100);
    }, [location]);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                `http://103.191.208.50/~gewlisca/halofoto_new/api/remove-account`,
                { otp, email }
            )
        } catch (error) {
            console.error('error:', error.message)
        }
    }

   
    return (
        spinner ? <div className="loader">
            <div className="outer"></div>
            <div className="middle"></div>
            <div className="inner"></div>
        </div> : (
            <div className="login__wrap">
                <div className="login__wrapp__inner">
                </div>
                <div className="login__holder">
                    <div className="form__holder">
                        <div className='form__holder__inner'>
                            <h2><span>Verify </span>OTP</h2>
                            <div className="form__wrapp">
                                <form>
                                    <div className="form-group form__group">
                                        <input className="form-control form__control" id="Password" name='password' autoComplete="off" type={passwordVisible ? 'text' : 'password'}
                                         value={otp} onChange={(e) => setOtp(e.target.value)} required 
                                        />
                                        <label htmlFor="Password">Enter OTP</label>    
                                        <i className='ico__box' onClick={togglePasswordVisibility}>
                                            {passwordVisible ?
                                                <img src={eye} alt='eye' /> :
                                                <img src={eye_close} alt='eye' />
                                            }
                                        </i>                                 
                                    </div>
                                    {/* <button className="submit__btn" type="button"
                                    //  onClick={handleSubmit} 
                                    >Validate</button> */}
                                     <Link onClick={handleSubmit} className="submit__btn" >Validate</Link>
                                </form>
                                <ToastContainer transition={Slide} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default OtpValidate