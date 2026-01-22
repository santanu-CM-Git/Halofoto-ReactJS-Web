import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer, Slide } from 'react-toastify';
import './LoginUser.css'
import { AuthContext } from './store/authContext';

const EditProfile = () => {
    const [profilePassword, setProfilePassword] = useState({ password: '', new_password: '', confirm_password:'' })
    const [spinner, setSpinner] = useState(true);
    const authCtx = useContext(AuthContext)
    
    const setUserPassword = e => {
        setProfilePassword({ ...profilePassword, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setTimeout(() => setSpinner(false), 100)
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.persist();

        let headers = new Headers(),
            formdata = new FormData(),
            url = `http://103.191.208.50/~gewlisca/halofoto_new/api/seller/update-password`;

        headers.append("Authorization", `Bearer ${authCtx.token.token}`);
        formdata.append("password", `${profilePassword.password}`);
        formdata.append("new_password", `${profilePassword.new_password}`);
        formdata.append("confirm_password", `${profilePassword.confirm_password}`);

        await fetch(url,{
            method: 'POST',
            headers,
            body: formdata,
            redirect: 'follow'
          })
            .then(response => response.json())
            .then(data => {
                if (typeof data.success != 'undefined' ) {
                    setProfilePassword({ ...profilePassword, ['password']: '', ['new_password']: '', ['confirm_password']: '' })
                    toast.success((data.success), {
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false
                    })

                } else if (typeof data.message != 'undefined') {
                    toast.error((data.message), {
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false
                    })
                } else if (typeof data.confirm_password != 'undefined') {
                    toast.error((data.confirm_password[0]), {
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false
                    })
                }
            })
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
                        <h2><span>Edit </span>Password</h2>
                        <div className="form__wrapp">
                            <form>
                                <div className="form-group form__group">
                                    <input className="form-control form__control" id="Password" name='password' autoComplete="off" type="password" value={profilePassword.password} onChange={e => setUserPassword(e)} required />
                                    <label htmlFor="Password">Enter old Password</label>
                                </div>
                                <div className="form-group form__group">
                                    <input className="form-control form__control" id="Password" name='new_password' autoComplete="off" type="password" value={profilePassword.new_password} onChange={e => setUserPassword(e)} required />
                                    <label htmlFor="Password">Enter new Password</label>
                                </div>
                                <div className="form-group form__group">
                                    <input className="form-control form__control" id="Password" name='confirm_password' autoComplete="off" type="password" value={profilePassword.confirm_password} onChange={e => setUserPassword(e)} required />
                                    <label htmlFor="Password">Confirm new Password</label>
                                </div>
                                <button className="submit__btn" type="button" onClick={handleSubmit} >Update</button>
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

export default EditProfile