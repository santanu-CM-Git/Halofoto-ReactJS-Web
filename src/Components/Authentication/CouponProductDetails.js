import React from 'react'
import logo from '../Image/lens.png'
import './CouponProductDetails.css'

const CouponProductDetails = () => {
  
  return (
    <div className="login__wrap">
      <div className="logo__holder">
        <img src={logo} alt="" />
      </div>
      <div className="login__inner__wrapp">
        <div className="login__holder">
          <div className="form__holder">
            <h3>Welcome to <span>HaloFoto</span></h3>
            <div className="form__wrapp">
              <form>
                <div className="form-group form__group">
                  <label>
                    <select>          
                      <option value="model 1">model 1</option>
                      <option value="model 2">model 2</option>
                      <option value="model 3">model 3</option>
                      <option value="model 4">model 4</option>
                    </select>
                  </label>
                </div>
                <div className="form-group form__group">
                  <input type="text" placeholder="Invoice no" required className="form-control form__control" />
                </div>
                <button className="submit__btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CouponProductDetails