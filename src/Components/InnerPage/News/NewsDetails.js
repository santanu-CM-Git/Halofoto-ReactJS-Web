import React, { useEffect, useState } from 'react'
import Banner from '../../Common/Banner/Banner'
import image from '../../Image/newsPhoto.png'
import calendar from '../../Image/calendar-ico.svg'
import comments from '../../Image/comments-ico.svg'
import arrowBlue from '../../Image/arrow-blue.svg'
import './NewsDetails.css'
import NewsSideBar from './NewsSideBar'
import { Link, useParams } from 'react-router-dom'
import { HaloFotoApi } from '../../../Api/api'
import Parser from 'html-react-parser';
import moment from 'moment/moment'
import '../../Common/css/loader.css'


const NewsDetails = () => {
  const param = useParams()
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [activePage, setActivePage] = useState(() => {
    if (param.page !== undefined) {
      return param.page
    }
    return 1
  })

  useEffect(() => {
    HaloFotoApi.getData('news/' + param.slug).then(
      data => {
        setData(data);
        setTimeout(() => setSpinner(false), 100)
      }
    )
  }, [param.slug])

  const currentActivePage = (page) => {
    setActivePage(page)
  }

  return (
    spinner ? <div className="loader">
        <div className="outer"></div>
        <div className="middle"></div>
        <div className="inner"></div>
    </div> : (
    <>
      <Banner bannerData={data.banner} />
      <div className='news__wrapp'>
        <div className='container'>
          <div className='row'>
            {data?.news && (
              <div className='col-xl-8 col-lg-8 col-md-7'>
                <div className='news__details__wrapp'>
                  <div className='image__box'>
                    <img src={data?.news.news_image} alt='' />
                  </div>
                  <div className='content__wrapp'>
                    <h2>{data.news.name}</h2>
                    <div className="news__meta">
                      <ul>
                        <li><a href="#"><i className="ico__box"><img src={calendar} alt="" /></i><span>{moment(data.news.created_at).format("MMM DD YYYY")}</span></a></li>
                        {/* <li><a href="#"><i className="ico__box"><img src={comments} alt="" /></i><span>Comments</span></a></li>
                        <li><a href="#"><i className="ico__box"><img src={arrowBlue} alt="" /></i><span>Lorem Ipsum has been Ipsum</span></a></li> */}
                      </ul>
                    </div>
                    {Parser(`${data.news.description}`)}
                  </div>
                  {/* <div class="blog__details__navigation">
                    {data.newslists.links.map((e, index) => (
                      <ListPaginate
                        page={e}
                        totalPage={data.newslists.links.length}
                        currentPage={index}
                        key={index}
                        activePage
                        onClickActive={currentActivePage}
                      />

                    ))} */}
                  {/* <div class="blog__single__navigation prev">
                    <a href="#">
                        <span><i className="ico__box"><Svg /></i>Previous</span>
                        <div className="news__title">There are many variations of passages of Lorem available, but the majority.</div>
                    </a>
                  </div>
                  <div class="blog__single__navigation next">
                    <a href="#">
                        <span>Next<i className="ico__box"><Svg /></i></span>
                        <div className="news__title">There are many variations of passages available, but the majority</div>
                    </a>
                  </div> */}
                </div>
              </div>
            )}
            <div className='col-xl-4 col-lg-4 col-md-5'>
              <NewsSideBar recentPosts={data.recentPosts} allCategories={data.allCategories} showSearchBar={false}/>
            </div>
          </div>
        </div>
      </div>
    </>
  ));
}

export default NewsDetails