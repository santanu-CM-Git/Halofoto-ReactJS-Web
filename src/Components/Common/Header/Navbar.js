import React, { useContext, useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import "./Navbar.css"
import useSticky from "../../../Hooks/useSticky"
import { HaloFotoApi } from "../../../Api/api"
import { AuthContext } from "../../Authentication/store/authContext"
import { API_BASE_URL, STORAGE_BASE_URL } from "../../../config/apiConfig"
import app_store from '../../Image/app_store_logo.svg.jpg'
import play_store from '../../Image/play_store_logo.svg.jpg'

const Navbar = () => {
  const authCtx = useContext(AuthContext)
  const { sticky, stickyRef } = useSticky()
  const [data, setData] = useState([])
  const [profileData, setProfileData] = useState([])
  const [hamMenu, toggleHamMenu] = useState(false)

  useEffect(() => {
    HaloFotoApi.getData("page/home").then((data) => {
       console.log(data,'dassafdsfdsfsdfdsf')
      setData(data)
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${API_BASE_URL}/seller/edit-profile`,
        {
          headers: { Authorization: `Bearer ${authCtx.token.token}` },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setProfileData(data)
        })
        .catch(function (error) {
          //console.log('Error!!!')
        })
    }
    if (authCtx?.token?.token) {
      fetchData()
    }
  }, [authCtx?.token?.token])

  const logout = () => {
    authCtx.logout()
  }

  return (
    <>
      {data?.header && (
       
        <nav
          className={`navbar navbar-expand-lg navbar__top ${sticky ? "sticky" : ""
            }`}
          ref={stickyRef}
        >
          <div className="container-xxl">
            <Link to="/" className="navbar-brand navbar__brand">
              <img
                src={`${STORAGE_BASE_URL}/storage/site_settings/${data.header.logo}`}
                alt="no content"
              />
            </Link>
            {hamMenu == false ?
              <button
                className="navbar-toggler hamburger__menu"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => toggleHamMenu(!hamMenu)}
              >
                <span className={hamMenu ? `menu animate` : `menu`}></span>
              </button>
              : ''}

            <div className="collapse navbar-collapse" id="navbarResponsive">
              <button
                className="navbar-toggler hamburger__menu hamburger__menu__inner"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => toggleHamMenu(!hamMenu)}
              >
                <span className={hamMenu ? `menu animate` : `menu`}></span>
              </button>
              <ul className="navbar-nav navbar__nav">
                <div className="navbar-nav play__store__wrapp">
                  <div className="play__store">
                  <Link to={`////play.google.com/store/apps/details?id=com.halofoto.halofotoLive`} target='blank'><img src={play_store} /></Link>
                  </div>
                  <div className="play__store">
                  <Link to={`////apps.apple.com/us/app/halofoto-app/id6474596677`} target='blank'><img src={app_store}/></Link>
                  </div>
                </div>
                {data?.header?.headerMenu?.items.map((e) => (
                  <li key={e.id}>
                    <NavLink to={e.link} activeclassname="active">{e.label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {authCtx.token.token ? (
              <div className="user__info">
                <ul>
                  <li className="dropdown dropdown__main">
                    {profileData?.user?.length !== "undefined" && (
                      <Link
                        to="/user"
                        className="dropdown-toggle dropdown__toggle"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="ico__box"></i>
                      </Link>
                    )}
                    <ul
                      className="dropdown-menu dropdown__menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link to="/coupon">Validasi Voucher</Link>
                      </li>
                      <li>
                        <Link to="/edit-profile">Edit Profile</Link>
                      </li>
                      <li>
                        <Link to="/edit-password">Edit Password</Link>
                      </li>
                      <li>
                        <Link to="/" onClick={logout}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="user__info__login">
                <Link to="/login">Login</Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  )
}

export default Navbar
