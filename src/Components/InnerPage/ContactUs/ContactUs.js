import React, { useEffect, useState } from "react";
import phone from "../../Image/Phone.svg";
import mail from "../../Image/mail.svg";
import ico_loc from "../../Image/icon-location.svg";
import ContactForm from "./ContactForm";
import "./ContactUs.css";
import Banner from "../../Common/Banner/Banner";
import Parser from "html-react-parser";
import { HaloFotoApi } from "../../../Api/api";
import { Link } from "react-router-dom";
import { STORAGE_BASE_URL } from "../../../config/apiConfig";

const ContactUs = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true);
  //   const [header, setHeader] = useState([])
  //   const [cols, setCols] = useState([])

  useEffect(() => {
    HaloFotoApi.getData("page/contact-us").then((data) => {
      setData(data);
      setTimeout(() => setSpinner(false), 100);
    });
  }, []);
  
  //   const handleFile = (e) => {
  //     const file = data?.description?.dealer_locator
  //     ExcelRenderer(file,(err, response) => {
  //         if(err) {
  //             console.log(err)
  //         } else {
  //             setHeader(response.rows[0])
  //         }
  //     })
  //   }

  return spinner ? (
    <div className="loader">
      <div className="outer"></div>
      <div className="middle"></div>
      <div className="inner"></div>
    </div>
  ) : (
    <>
      <div>
        <Banner bannerData={data.banner} />
        {data?.description && (
          <div className="contact__inner">
            <div className="container">
              <div className="contact__content">
                {Parser(`${data.description.contact_content}`)}
              </div>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="contact__info__card">
                    <div className="ico__box">
                      <img
                        src={`${STORAGE_BASE_URL}/storage/pages/${data.description.contact_image1}`}
                        alt=""
                      />
                    </div>
                    <div className="card__content">
                      {Parser(`${data.description.image_name1}`)}
                      {Parser(`${data.description.contact_content1}`)}
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="contact__info__card">
                    <div className="ico__box">
                      <img
                        src={`${STORAGE_BASE_URL}/storage/pages/${data.description.contact_image2}`}
                        alt=""
                      />
                    </div>
                    <div className="card__content">
                      {Parser(`${data.description.image_name2}`)}
                      {Parser(`${data.description.contact_content2}`)}
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                  <div className="contact__info__card">
                    <div className="ico__box">
                      <img
                        src={`${STORAGE_BASE_URL}/storage/pages/${data.description.contact_image3}`}
                        alt=""
                      />
                    </div>
                    <div className="card__content">
                      {Parser(`${data.description.image_name3}`)}
                      {Parser(`${data.description.contact_content3}`)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="map__wrapp">
                {/* <h2>To get the details of Dealer, click on this button</h2> */}
                <h2>Untuk mendapatkan rincian Dealer, klik tombol ini</h2>
                <a
                  href={data?.description?.dealer_locator}
                  download="Dealer's Location"
                >
                  {/* <button className="button__wrapp">Dealer's Location</button> */}
                  <button className="button__wrapp">List Toko</button>
                </a>
                {/* <table style={{borderCollapse:"collapse", margin:"10px auto", border:"1px solid black"}}>
                    <thead>
                        <tr>
                            {header.map((h,i) => (
                                <th style={{border:"1px solid black"}} key={i}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cols.slice(1).map((col,i) => (
                            <tr style={{border:"1px solid black"}} key={i}>
                                {
                                    col.map((c,i) =>(
                                        <td key={i}>{c}</td>
                                    ))
                                }
                            </tr>
                        ))}
                    </tbody>
                </table> */}
                {/* <iframe
                  width="100%"
                  height="600"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={data?.description?.dealer_locator}
                /> */}
              </div>
            </div>
          </div>
        )}
        <ContactForm contactFormData={data?.description} />
      </div>
    </>
  );
};

export default ContactUs;
