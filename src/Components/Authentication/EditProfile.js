import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer, Slide } from 'react-toastify';
import './LoginUser.css'
import '../Common/css/loader.css'
import { AuthContext } from './store/authContext';
import { API_BASE_URL } from '../../config/apiConfig';

const EditProfile = () => {
    const [proifileInfo, setProifileInfo] = useState({ name: '', phone: '' })
    const [spinner, setSpinner] = useState(true);
    const authCtx = useContext(AuthContext)
    

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`${API_BASE_URL}/seller/edit-profile`, {
                headers: { Authorization: `Bearer ${authCtx.token.token}` }
            }).then(response => response.json())
                .then(data => {

                    if (typeof 'undefined' !== data?.user?.id) {
                        setProifileInfo({ ...proifileInfo, ['name']: data?.user?.name, ['phone']: data?.user?.phone });
                    }
                    setTimeout(() => setSpinner(false), 100)
                }).catch(function (error) {
                    console.log('Error!!!')
                })
        }
        fetchData()
    }, [])

    const setUserInfo = e => {
        setProifileInfo({ ...proifileInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.persist();

        let headers = new Headers(),
            formdata = new FormData(),
            url = `${API_BASE_URL}/seller/update-profile`;

        headers.append("Authorization", `Bearer ${authCtx.token.token}`);
        formdata.append("name", `${proifileInfo.name}`);
        formdata.append("phone", `${proifileInfo.phone}`);

        await fetch(url,{
            method: 'POST',
            headers,
            body: formdata,
            redirect: 'follow'
          })
            .then(response => response.json())
            .then(data => {
                if (typeof data?.message != 'undefined' ) {
                    
                    toast.success((data?.message), {
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false
                    })
                } else if (typeof data?.name != 'undefined') {
                    toast.error((data?.name[0]), {
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false
                    })
                } else if (typeof data?.phone != 'undefined') {
                    toast.error((data?.phone[0]), {
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
                            <h2><span>Edit </span>Profile</h2>
                            <div className="form__wrapp">
                                <form>
                                    <div className="form-group form__group">
                                        <input className="form-control form__control" id="Name" name="name" autoComplete="off" type="text" value={proifileInfo.name} onChange={e => setUserInfo(e)} required />
                                        <label htmlFor="Name">Name</label>
                                    </div>
                                    <div className="form-group form__group">
                                        <input className="form-control form__control" id="Contact" name="phone" autoComplete="off" type="text" value={proifileInfo.phone} onChange={e => setUserInfo(e)} required />
                                        <label htmlFor="Contact">Contact No.</label>
                                    </div>
                                    <button className="submit__btn" type="button" onClick={handleSubmit}>Submit</button>
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

// useEffect(() => {
//     (async () => {
//       const users = await fetchUsers();
//       setUsers(users);
//     })();