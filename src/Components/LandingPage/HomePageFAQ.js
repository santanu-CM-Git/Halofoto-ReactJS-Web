import React, { useState } from 'react'
import './HomePageFAQ.css'
import Parser from 'html-react-parser';

const HomePageFAQ = props => {
   const { homeFaqTitleData, homeFaqData } = props
 
   return (
      <div className="faq__wrapp">
         <div className="container-xxl">
            {homeFaqTitleData != undefined && (
               <div className="center__heading__wrapp">
                  <h2>{homeFaqTitleData.faq_title}</h2>
                  <div className="divider__line">&nbsp;</div>
                  {Parser(`${homeFaqTitleData.faq_content}`)}
               </div>
            )}
            <div className="faq__wrapp__inner">
               <div className="row">
                  <div className="col-xl-10 col-lg-10 col-md-12 offset-xl-1 offset-lg-1">
                  <div className="accordion faq__accordion" id="accordionFaq">
                     {homeFaqData && homeFaqData?.length && homeFaqData.map((e, index) => (
                           <div className="accordion-item faq__accordion__item" key={index}>
                              <h2 className="accordion-header accordion__header" id={`heading${index}`}>
                                 <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                                    {e.title != null && (
                                       <>{e.title}</>)}
                                 </button>
                              </h2>
                              <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionFaq">
                                 {e.description != null && (
                                    <div className="faq__accordion__body">
                                       {Parser(`${e.description}`)}
                                    </div>
                                  )}
                              </div>
                           </div>                        
                     ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
export default HomePageFAQ
