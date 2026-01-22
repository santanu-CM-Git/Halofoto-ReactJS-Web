import Navbar from './Components/Common/Header/Navbar';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import ContactUs from './Components/InnerPage/ContactUs/ContactUs';
import Footer from './Components/Common/Footer/Footer';
import TermsAndCondition from './Components/InnerPage/Terms&Conditions/TermsAndCondition';
import HaloStory from './Components/InnerPage/HaloStory/HaloStory';
import HaloStoryDetails from './Components/InnerPage/HaloStory/HaloStoryDetails';
import HomePageIndex from './Components/LandingPage/HomePageIndex';
import Products from './Components/InnerPage/Products/Products';
import AboutUs from './Components/InnerPage/AboutUs/AboutUs';
import FAQ from './Components/InnerPage/FAQs/FAQ';
import NewsDetails from './Components/InnerPage/News/NewsDetails';
import News from './Components/InnerPage/News/News';
import ProductDetails from './Components/InnerPage/Products/ProductDetails';
import SellerLogin from './Components/Authentication/SellerLogin';
import OtpLogin from './Components/Authentication/OtpLogin';
import Coupon from './Components/Authentication/Coupon';
import CouponProductDetails from './Components/Authentication/CouponProductDetails';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './Components/Authentication/store/authContext';
import EditProfile from './Components/Authentication/EditProfile';
import EditPassword from './Components/Authentication/EditPassword';
import './Components/Common/css/loader.css'
import AppDownload from './Components/Common/AppDownload/AppDownload';
import NotFound from './Components/Common/NotFound/NotFound';
import EmailSection from './Components/Account_remove/EmailSection';
import OtpValidate from './Components/Account_remove/OtpValidate';

function App() {
  const [spinner, setSpinner] = useState(true)
  const [showNavbarAndFooter, setShowNavbarAndFooter] = useState(true)

  useEffect(() => {
    setTimeout(() => setSpinner(false), 100)
  }, []);

  const authCtx = useContext(AuthContext);

  let authAwareRoutes = (
    <>
      <Route path="/login" element={<SellerLogin />}></Route>
      <Route path="/coupon" element={<Navigate to="/login" replace />} />
    </>
  );

  if (authCtx?.token?.token) {
    authAwareRoutes = (
      <>
        <Route path="/coupon" element={<Coupon />}></Route>
        <Route path="/login" element={<Navigate to="/coupon" replace />} />
      </>
    );
  }


  return (
    spinner ? <div className="loader">
      <div className="outer"></div>
      <div className="middle"></div>
      <div className="inner"></div>
    </div> : (
      <div className="App">
        <Router 
        basename={process.env.NODE_ENV === 'production' ? "/~gewlisca/halofoto-react" : ""}
        >
          {showNavbarAndFooter && <Navbar />}
          <Routes>
            <Route path="/" element={<HomePageIndex />} />
            <Route path="/page/contact-us" element={<ContactUs />} />
            <Route path="/story" element={<HaloStory />} />
            <Route path="/story/:slug" element={<HaloStoryDetails />} />
            <Route path="/category/news/:slug" element={<News />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/page/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/page/:slug" element={<TermsAndCondition />} />
            {/* <Route path='/remove-account' element={<EmailSection />} /> */}
            <Route path='/remove-account' element={<EmailSection setShowNavbarAndFooter={setShowNavbarAndFooter} />} />
            {/* <Route path='/otp-validate' element={<OtpValidate/>} /> */}
            {authAwareRoutes}
            <Route path='/otp-Login' element={<OtpLogin />} />
            <Route path='/coupon-details' element={<CouponProductDetails />} />
            <Route path='/edit-profile' element={<EditProfile />} />
            <Route path='/edit-password' element={<EditPassword />} />
            <Route path='/download' element={<AppDownload />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          {showNavbarAndFooter && <Footer />}
        </Router>
      </div>
    )
  );
}

export default App;
