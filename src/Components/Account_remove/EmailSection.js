import React, { useState, useRef, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './EmailSection.css'
import eye from '../Image/eye.svg'
import eye_close from '../Image/eye_close.svg'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer, Slide } from 'react-toastify'
import '../Common/css/loader.css'
import axios from 'axios'
import { API_BASE_URL } from '../../config/apiConfig'

const EmailSection = ({ setShowNavbarAndFooter }) => {

    const [spinner, setSpinner] = useState(true)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    useEffect(() => {
        setShowNavbarAndFooter(false)
        return () => {
            setShowNavbarAndFooter(true)
        }
    }, [setShowNavbarAndFooter])

    useEffect(() => {
        setTimeout(() => setSpinner(false), 1000)
    }, []);

    const [setError] = useState(null)


    const submitFormHandler = async (e) => {
        e.preventDefault()
        e.persist()

        fetch(`${API_BASE_URL}/remove-account/confirm`, {
            method: "POST",
            body: JSON.stringify({
                "email": `${email}`,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => {
                if (response.status == 200) {
                    setOpen(true)
                    toast.success(((response.message), 'Otp has been sent to your mail'), {
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false
                    })
                } else if (response.status !== 200) {
                    setEmail('')                    
                    toast.error(((response.errors?.email[0]), 'The selected email is invalid.'), {
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false
                    })
                }
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.persist()

        fetch(`${API_BASE_URL}/remove-account`, {
            method: "POST",
            body: JSON.stringify({ email, otp }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => {
                if (response.status == 200) {
                    setEmail('')
                    setOtp('')
                    setOpen(false)
                    toast.success(((response.message), 'Account Deleted!'), {
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false
                    })
                } else if (response.status !== 200) {
                    setEmail('')
                    setOtp('')
                    setOpen(false)
                    toast.error(((response.errors?.email[0]), 'Wrong otp, please start again'), {
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false
                    })
                }
            }
            )
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
                            <h2><span>Want to</span> remove account ?</h2>
                            <div className="form__wrapp">
                                <form>
                                    <div className="form-group form__group form__control">
                                        {open == true ? <input className="form-control" autoComplete="off" disabled type="email" placeholder={email} required id="email" />
                                            : <input className="form-control" autoComplete="off" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required id="email" />}
                                        <label>Email</label>
                                    </div>
                                    {open == false ? <div className='form__holder__inner__footer'>
                                        <Link className="submit__btn" onClick={submitFormHandler}>Submit</Link>
                                    </div>
                                        : ''}
                                </form>
                                {open &&
                                    <form>
                                        <div className="form-group form__group form__control">
                                            <input className="form-control" autoComplete="off" type={passwordVisible ? 'text' : 'password'} value={otp} onChange={(e) => setOtp(e.target.value)} required id="password" />
                                            <label>Enter OTP</label>
                                            <i className='ico__box' onClick={togglePasswordVisibility}>
                                                {passwordVisible ?
                                                    <img src={eye} alt='eye' /> :
                                                    <img src={eye_close} alt='eye' />
                                                }
                                            </i>
                                        </div>
                                        <div className='form__holder__inner__footer'>
                                            <Link className="submit__btn" onClick={handleSubmit}>Validate</Link>
                                        </div>
                                    </form>
                                }
                                <ToastContainer transition={Slide} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
}

export default EmailSection

