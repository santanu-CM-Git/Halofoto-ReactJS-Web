import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Image/Frame.png'
import facebook from '../../Image/facebook.svg'
import twitter from '../../Image/twitter.svg'
import linkedin from '../../Image/linkedin.svg'
import youtube from '../../Image/youtube.svg'
import tiktok from '../../Image/tiktok.svg'
import instagram from '../../Image/instagram.svg'
import './Footer.css'
import { HaloFotoApi } from '../../../Api/api'
import AppDownload from '../AppDownload/AppDownload'

const Footer = () => {
    const image = {
        'facebook': facebook,
        'twitter': twitter,
        'linkedin': linkedin,
        'youtube': youtube,
        'tiktok': tiktok,
        'instagram': instagram,
    }

    const [data, setData] = useState([]);
    useEffect(() => {
        HaloFotoApi.getData('page/home').then(
            data => {
                setData(data);
            }
        )
    }, [])

    return (
        <footer>
            <div className='footer__main'>
                <div className='container-xxl'>
                    <div className='footer__brand'>
                        {data?.footer != undefined && (
                            <img src={`http://103.191.208.50/~gewlisca/halofoto_new/storage/site_settings/${data.footer.light_logo}`} alt='' />
                        )}
                    </div>
                    <div className='footer__content'>
                        <ul>
                            {data?.footer?.footerMenu?.items.map(e => (
                                <li key={e.id}><Link to={e.link}>{e.label}</Link></li>
                            ))}
                            {/* <li> <Link className='link__button' to='/download' target='blank'>
                           Download Link</Link></li> */}
                            <div className="user__info__login">
                                <Link to='/download'> Download Link</Link>
                            </div>
                        </ul>
                    </div>
                    <div className='footer__bottom'>
                        <div className='footer__copyright'>
                            {data?.footer != undefined && (
                                <p>{data.footer.copyrightText}</p>
                            )}
                        </div>
                        <div className='footer__social__media'>
                            <ul>
                                {data?.footer?.socialMenu?.items.map(e => (
                                    <li key={e.id}><a href={e.link} target='blank'><img src={image[e.class]} alt={e.label} /></a></li>
                                ))}
                            </ul>
                        </div>
                        <div className='footer__terms__policy'>
                            <ul>
                                {data?.footer?.termsMenu?.items.map(e => (
                                    <li key={e.id}><Link to={e.link}>{e.label}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer