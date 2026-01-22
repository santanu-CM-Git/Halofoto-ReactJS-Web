import React, { useEffect, useState } from "react";
import { HaloFotoApi } from "../../../Api/api";
import Banner from "../../Common/Banner/Banner";
import Parser from "html-react-parser";
import "./FAQ.css";

const FAQ = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    HaloFotoApi.getData("page/faq").then((data) => {
      setData(data);
      setTimeout(() => setSpinner(false), 100);
    });
  }, []);

  return spinner ? (
    <div className="loader">
      <div className="outer"></div>
      <div className="middle"></div>
      <div className="inner"></div>
    </div>
  ) : (
    <>
      <Banner bannerData={data.banner} />
      <div className="faq__wrapp">
        <div className="container">
          {data?.page && (
            <div className="center__heading__wrapp">
              <h2>{data?.page?.seo_title}</h2>
              <div className="divider__line">&nbsp;</div>
              {data?.page?.meta_content &&
                data?.page?.meta_content?.length > 0 &&
                Parser(`${data?.page?.meta_content}`)}
            </div>
          )}
          <div className="faq__wrapp__inner">
            <div className="row">
              <div className="col-xl-10 col-lg-10 col-md-12 offset-xl-1 offset-lg-1">
                {data?.faq && data?.faq?.length > 0 && (
                  <div className="accordion faq__accordion" id="accordionFaq">
                    {data.faq.map((e, index) => (
                      <div
                        className="accordion-item faq__accordion__item"
                        key={index}
                      >
                        <h2
                          className="accordion-header accordion__header"
                          id={`heading${index}`}
                        >
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded="false"
                            aria-controls={`collapse${index}`}
                          >
                            {e?.title}
                          </button>
                        </h2>

                        <div
                          id={`collapse${index}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`heading${index}`}
                          data-bs-parent="#accordionFaq"
                        >
                          <div className="faq__accordion__body">
                            {e?.description && Parser(`${e?.description}`)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
