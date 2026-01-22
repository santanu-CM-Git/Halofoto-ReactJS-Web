import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HaloFotoApi } from '../../../Api/api'
import Banner from '../../Common/Banner/Banner'
import Parser from 'html-react-parser';
import './TermsAndCondition.css'
import '../../Common/css/loader.css'

const TermsAndCondition = () => {
   const param = useParams()
   const [data, setData] = useState([]);
   const [spinner, setSpinner] = useState(true);

   useEffect(() => {
      
      HaloFotoApi.getData(`page/${param.slug}`).then(
         data => {
            setData(data);
            setTimeout(() => setSpinner(false), 100)
         }
      )
   }, [param.slug])

   return (
      spinner ? <div className="loader">
          <div className="outer"></div>
          <div className="middle"></div>
          <div className="inner"></div>
      </div> : (
      <>
         <Banner bannerData={data.banner} />
         {data !== undefined && (
            <div className='cms__main'>
               <div className='container'>
                  <div className="heading__wrapp">
                     <h2>{data?.page?.name}</h2>
                     <div className="divider__line">&nbsp;</div>
                     {Parser(`${data?.page?.meta_content}`)}
                  </div>
                  {Parser(`${data?.description?.main_content}`)}
               </div>
            </div>
         )}
      </>
   ));
}
export default TermsAndCondition