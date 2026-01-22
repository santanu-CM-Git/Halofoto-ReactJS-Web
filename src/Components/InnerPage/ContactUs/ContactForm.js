import React, { useEffect, useState } from 'react'
import './ContactForm.css'
import Parser from 'html-react-parser';
import { toast, ToastContainer, Slide } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { API_BASE_URL } from '../../../config/apiConfig'

const ContactForm = props => {
    const formData = props.contactFormData

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [phone, setphone] = useState('');
    const [spinner, setSpinner] = useState(true);

    useEffect(() => {
        setTimeout(() => setSpinner(false), 100)
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.persist();

            fetch(`${API_BASE_URL}/contact/save`, {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    subject,
                    message
                }),
                redirect: 'follow',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (typeof data.status != 'undefined' && data.status === 200) {
                    setName('');
                    setEmail('');
                    setSubject('');
                    setphone('');
                    setMessage('')
                    toast.success((data.message), {
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false
                    })
                } else if (typeof data.name != 'undefined') {
                    setName('');
                    setEmail('');
                    setSubject('');
                    setphone('');
                    setMessage('')
                    toast.error((data.name[0]), {
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false
                    })
                } else if (typeof data.email != 'undefined') {
                    setName('');
                    setEmail('');
                    setSubject('');
                    setphone('');
                    setMessage('')
                    toast.error((data.email[0]), {
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false
                    })
                } else if (typeof data.phone != 'undefined') {
                    setName('');
                    setEmail('');
                    setSubject('');
                    setphone('');
                    setMessage('')
                    toast.error((data.phone[0]), {
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false
                    })
                } else if (typeof data.subject != 'undefined') {
                    setName('');
                    setEmail('');
                    setSubject('');
                    setphone('');
                    setMessage('')
                    toast.error((data.subject[0]), {
                        position: toast.POSITION.TOP_CENTER,
                        closeButton: false
                    })
                } else if (typeof data.message != 'undefined') {
                    setName('');
                    setEmail('');
                    setSubject('');
                    setphone('');
                    setMessage('')
                    toast.error((data.message), {
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
            <>
        <div className='contact__wrapp__inner'>
            <div className='container'>
                {formData !== undefined && (
                    <div className='row'>
                        <div className='col-xl-5 col-lg-5'>
                            <div className='content__holder'>
                                {formData?.form_heading?.length && Parser(`${formData?.form_heading}`)}
                                {formData?.form_description?.length && Parser(`${formData?.form_description}`)}
                                <div className='form__wrapp'>
                                    <div className='form-group form__group'>
                                        <div className="form__group__inner">
                                            <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} className="form-control form__control" />
                                        </div>
                                        <div className="form__group__inner">
                                            <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="form-control form__control" />
                                        </div>
                                        <div className="form__group__inner">
                                            <input type="text" value={phone} placeholder="Phone No." onChange={(e) => setphone(e.target.value)} className="form-control form__control" />
                                        </div>
                                        <div className='form__group__inner'>
                                            <input type="text" value={subject} placeholder="Subject " onChange={(e) => setSubject(e.target.value)} className="form-control form__control" />
                                        </div>
                                        <div className='form__group__inner'>
                                            <textarea type="text" value={message} placeholder="Message..." onChange={(e) => setMessage(e.target.value)} className="form-control form__control"></textarea>
                                        </div>
                                    </div>
                                    <div className="form__footer">
                                        <button className="submit__btn" type="button" onClick={handleSubmit}>Send Message</button>
                                    </div>
                                    <ToastContainer transition={Slide}/>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-7 col-lg-7'>
                            <div className='map__wrapp'>
                                <iframe title='#' src={formData.map_link} width="100%" height="600" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
        )
    );
}

export default ContactForm