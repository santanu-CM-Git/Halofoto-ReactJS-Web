import React from 'react'
import calendar from '../../Image/calendar-ico.svg'
import arrowBlue from '../../Image/arrow-blue.svg'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'
import './NewsSideBar.css'

const NewsSideBar = props => {
    const { recentPosts, allCategories, setSearchSubmit, setSearchValue, showSearchBar } = props

    const frmOnSubmit = e => {
        e.preventDefault()
        setSearchSubmit(true)
    }

    return (
        <div className="sidebar__wrapp">
            <div className="sidebar__wrapp__inner">
                {showSearchBar &&
                    <div className="search__wrapp">
                        <form onSubmit={frmOnSubmit}>
                            <div className="form-group form__group">
                                <input type="text" placeholder="Search..." className="form-control form__control" onKeyUp={e => setSearchValue(e.target.value)} />
                                <button type="submit" className="search__btn"></button>
                            </div>
                        </form>
                    </div>
                }
            </div>

            <div className="sidebar__wrapp__inner">
                <h3>Recent post</h3>
                <div className="recent__news__list">
                    <ul>
                        {recentPosts !== undefined && recentPosts.map(e => (
                            <li key={e.id}>
                                {(e?.news_image?.length && e?.news_image?.length) ?
                                    <div className="image__box">
                                        <Link to={`/news/${e.slug}`}>
                                            <img src={e.news_image} alt="" />
                                        </Link>
                                    </div> : null}
                                <div className="news__containt">
                                    <h3>
                                        <Link to={`/news/${e.slug}`}>{e.name}</Link>
                                    </h3>
                                    <div className="news__meta">
                                        <ul>
                                            <li><Link to={`/news/${e.slug}`}><i className="ico__box"><img src={calendar} alt="" /></i><span>{moment(e.created_at).format("MMM DD YYYY")}</span></Link></li>
                                            {/* <li><Link to={`/news/${e.slug}`}><i className="ico__box"><img src={comments} alt="" /></i><span>Comments</span></Link></li> */}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="sidebar__wrapp__inner">
                <h3>News Categories</h3>
                <div className="news__category__list">
                    <ul>
                        {allCategories !== undefined && allCategories.map(e => (
                            <li key={e.id}><Link to={`/category/news/${e.slug}`}><i className="ico__box"><img src={arrowBlue} alt="" /></i>{e.name}</Link></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NewsSideBar