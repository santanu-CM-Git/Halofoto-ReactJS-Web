import React from 'react'
import { useNavigate } from 'react-router-dom'
import './OtpLogin.css'

const OtpLogin = ({ viewOtpForm }) => {
    const Navigate = useNavigate()
    const loginSubmit = () => {

    }
    const otpSubmit = () => {

    }
    return (
        <div className="wrapper">
            <h1 className="main-heading">Sign in</h1>
            <p className="sub-text">Sign in using your mobile number.</p>
            {!viewOtpForm ? (
                <div className="form__wrap">
                    <form className='login__form' onSubmit={loginSubmit}>
                        <div className="input__field">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                name="phone"
                                autoComplete="false"
                            />
                        </div>
                        <button className="main__button" type="submit" id="sign-in-button">
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                <div className="form__wrapper" onSubmit={otpSubmit}>
                    <form id="otpForm">
                        <div className="input__field">
                            <label>Enter OTP</label>
                            <input
                                type="number"
                                placeholder="One time password"
                                name="otp_value"
                                autoComplete="false"
                            />
                        </div>
                        <button className="main__button" onClick={()=> Navigate('/coupon')}>
                            Verify OTP
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default OtpLogin