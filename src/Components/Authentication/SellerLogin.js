import React, { useState, useRef, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './LoginUser.css'
import { login } from './Service/auth-api'
import { AuthContext } from './store/authContext'
import { toast, ToastContainer, Slide } from 'react-toastify';
import '../Common/css/loader.css'
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    position: 'absolute',
    left: '60%',
};

const SellerLogin = () => {
    // const Navigate = useNavigate()
    const authCtx = useContext(AuthContext)
    const [spinner, setSpinner] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => setSpinner(false), 1000)
    }, []);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [setError] = useState(null);

    async function submitFormHandler(e) {
        e.preventDefault();
        e.persist();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        let authenticate = login;
        setLoading(true);

        try {
            const response = await authenticate(enteredEmail, enteredPassword);
            if (response.token) {
                authCtx.authenticateUser(response.token);
            }
        } catch (error) {
            toast.error(error.message || "An error occurred", {
                position: toast.POSITION.TOP_CENTER,
                closeButton: false
            });
        } finally {
            setLoading(false); // Ensure loading state is reset
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
                            <h2><span>Welcome to</span> HaloFoto</h2>
                            <div className="form__wrapp">
                                <form onSubmit={submitFormHandler}>
                                    <div className="form-group form__group">
                                        <input type="email" ref={emailInputRef} required className="form-control form__control" id="username" autoComplete="off" />
                                        <label htmlFor="username">Email</label>
                                    </div>
                                    <div className="form-group form__group">
                                        <input type="password" ref={passwordInputRef} minLength={6} required className="form-control form__control" id="password" autoComplete="off" />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    {/* <div className='checkbox__custom'>
                                    <input type='checkbox' id="styled-checkbox-1" className='styled__checkbox' value='remember-me' />
                                    <label htmlFor="styled-checkbox-1">Remember me</label>
                                </div> */}
                                    <div className='form__holder__inner__footer'>
                                        <button
                                            disabled={loading}
                                            className="submit__btn">Login
                                            <ClipLoader
                                                color={"#ffffff"}
                                                loading={loading}
                                                cssOverride={override}
                                                size={25}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </button>
                                        {/* <Link to='/otp-Login'>Login with Otp</Link> */}
                                    </div>
                                </form>
                                <ToastContainer transition={Slide} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
}

export default SellerLogin

