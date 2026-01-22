import React, { useEffect, useState } from "react";
import CallToAction from "./CallToAction";
import HomePageHaloStory from "./HomePageHaloStory";
import HomePageBanner from "./HomePageBanner";
import LatestNews from "./LatestNews";
import OurProdutcs from "./OurProdutcs";
import HomePageFAQ from "./HomePageFAQ";
import { HaloFotoApi } from "../../Api/api";
import "../Common/css/loader.css";

const HomePageIndex = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    HaloFotoApi.getData("page/home").then((data) => {
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
    <div>
      {data && data?.banner && <HomePageBanner homeBannerData={data?.banner} />}
      {data && data?.description && <CallToAction homeCtaData={data?.description} />}
      {data && data?.description && data?.product && <OurProdutcs homeProductsTitleData={data?.description} homeProductData={data?.product} />}
      {data && data?.description && data?.story && <HomePageHaloStory homeStoryTitleData={data?.description} homeStoryData={data?.story} />} 
      {data && data?.description && data?.faq && <HomePageFAQ homeFaqTitleData={data?.description} homeFaqData={data?.faq} />}
      {data && data?.description && data?.news && <LatestNews homeNewsTitleData={data?.description} homenewsData={data?.news} />}
    </div>
  );
};

export default HomePageIndex;
