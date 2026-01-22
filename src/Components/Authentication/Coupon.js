import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./Coupon.css";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { AuthContext } from "./store/authContext";
import "../Common/css/loader.css";
import { searchMembershipById, getVoucherDetails, addWarranty, isCheckWarranty } from './Service/coupon-api'
import { Table, Button, Modal } from 'react-bootstrap';
import GlobalLoader from '../Common/GlobalLoader';
import ClipLoader from "react-spinners/ClipLoader";

const defaultFormData = {
  id: '',
  sellerName: '',
  voucherCode: '',
  fixValue: '',
  percentage: '',
  userName: '',
  email: '',
  file: '',
  modelNo: '',
  serialNo: '',
  date: '',
  minDate: '',
  maxDate: '',
  status: ''
};

const Coupon = () => {

  const authCtx = useContext(AuthContext);
  const [spinner, setSpinner] = useState(true);
  const [memberId, setMemberId] = useState('');
  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [data, setData] = useState(null);
  const [voucherData, setVoucherData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const [alreadytaken, setAlreadyTaken] = useState(false);

  const selectRef = useRef();

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000);
  }, []);

  useEffect(() => {
    if (voucherData !== null) {
      setFormData(prevFormData => ({
        ...prevFormData, // Retain the previous values
        sellerName: voucherData.seller_name || prevFormData.sellerName,
        voucherCode: voucherData.voucher_redeem_code || prevFormData.voucherCode,
        fixValue: voucherData.fixed_value || prevFormData.fixValue,
        percentage: voucherData.percentage || prevFormData.percentage,
        userName: voucherData.user_name || prevFormData.userName,
        email: voucherData.user_email || prevFormData.email,
        minDate: voucherData.vocher_start_date || prevFormData.minDate,
        maxDate: voucherData.voucher_end_date || prevFormData.maxDate,
      }));
    }
  }, [voucherData]);

  useEffect(() => {
    if (!showModal) {
      setFormData(defaultFormData);
    }
  }, [showModal]);

  const onSearchHandler = async () => {
    if (!authCtx?.token?.token) {
      console.error("Authentication token is missing.");
      return;
    }
    setLoading(true);
    try {
      const response = await searchMembershipById(authCtx.token.token, memberId);
      if (response.status) {
        setData(response.data);
        console.log("Membership data found:", response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching membership data:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!authCtx?.token?.token) {
      console.error("Authentication token is missing.");
      return;
    }
    setGlobalLoading(true);
    try {
      const response = await addWarranty(authCtx.token.token, formData);
      if (response.status) {
        toast.success(response.message, { position: toast.POSITION.TOP_RIGHT, closeButton: true });
        setShowModal(false);
        updateVoucherDetails(formData.id);
      } else {
        setShowModal(true);
      }
    } catch (error) {
      toast.error("Error fetching membership data:", error.message || error, { position: toast.POSITION.TOP_RIGHT, closeButton: true });
    } finally {
      setGlobalLoading(false);
    }
  };

  const onApplyVoucherHandle = async (id) => {
    if (!authCtx?.token?.token) {
      console.error("Authentication token is missing.");
      return;
    }
    setGlobalLoading(true);
    try {
      const response = await getVoucherDetails(authCtx.token.token, id);
      if (response.status) {
        setVoucherData(response.data);
        setShowModal(true);
        setFormData({ ...formData, id: id });
        console.log("Membership data found:", response.data);
      } else {
        setVoucherData(null);
        setFormData({ ...formData, id: '' });
      }
    } catch (error) {
      console.error("Error fetching membership data:", error.message || error);
    } finally {
      setGlobalLoading(false);
    }
  };

  const updateVoucherDetails = (id) => {
    let arry = data.voucher_list;
    let index = arry.findIndex((item) => item.voucher_id === id);
    if (index !== -1) {
      arry[index].voucher_code_status = "1";
      arry[index].voucher_code_apply = "Already applied";
      setData({
        ...data,
        voucher_list: arry,
      });
    } else {
      console.log(`Voucher with ID ${id} not found.`);
    }
  };

  const renderButton = (item) => {
    switch (item.voucher_code_status.toString()) {
      case '0':
        return (
          <button
            onClick={() => onApplyVoucherHandle(item.voucher_id)}
            type="button"
            className="btn btn-primary btn-sm"
          >
            {item?.voucher_code_apply}
          </button>
        );
      case '1':
        return (
          <button type="button" className="btn btn-warning btn-sm">
            {item?.voucher_code_apply}
          </button>
        );
      case '2':
        return (
          <button type="button" className="btn btn-secondary btn-sm">
            Unavailable
          </button>
        );
      default:
        return null; // Fallback case
    }
  };

  const debounce = (fn, delay) => {
    let timeout = -1;
  
    return (...args) => {
      if (timeout !== -1) {
        clearTimeout(timeout);
      }
  
      timeout = setTimeout(fn, delay, ...args);
    };
  };

  const requestCheckWarrenty = useMemo(() => {
    return debounce((query) => {
      checkWarrenty(query);
    }, 500);
  }, []);

  const checkWarrenty = async(serialNo)=>{
    if (!authCtx?.token?.token) {
      console.error("Authentication token is missing.");
      return;
    }
    setGlobalLoading(true);
    try {
      const response = await isCheckWarranty(authCtx.token.token, serialNo);
      // console.log('======>', response);
    
      const warrantyExists = response?.data?.exist === true ? true : false;
    
      if (selectRef.current) {
        selectRef.current.disabled = warrantyExists === false ? false : true;
      }
    
      if (warrantyExists === false) {
        setAlreadyTaken(false)
        setFormData((prevData) => ({ ...prevData, status: '' }));
      }else{
        setAlreadyTaken(true)
        setFormData((prevData) => ({ ...prevData, status: 'pending' }));
      }
    
    } catch (error) {
      console.error("Error fetching membership data:", error?.message || error);
    } finally {
      setGlobalLoading(false);
    }
    
  }


  const handleClose = () => {
    setShowModal(false);
    setAlreadyTaken(false)
  }
  return spinner ? (
    <div className="loader">
      <div className="outer"></div>
      <div className="middle"></div>
      <div className="inner"></div>
    </div>
  ) : (
    <div className="coupon__wrap">
      <div className="title-container">
        <h3>Validate Voucher</h3>
      </div>
      <div className="form-container">
        <div className="membership_form_group">
          <input
            type="text"
            placeholder="Enter Membership Id"
            onChange={(e) => setMemberId(e.target.value)}
            value={memberId}
            className="form_control" />
          <button
            onClick={() => onSearchHandler()}
            disabled={loading}
            type="button"
            className="apply_btn">Apply</button>
        </div>
      </div>
      {!loading && data !== null ?
        <div className="table_container">
          <div className="user_details_view">
            <label><strong>User Name:</strong> {data?.user_name}</label>
            <label><strong>Email:</strong> {data?.user_email}</label>
          </div>
          <div className="coupon_voucher_table">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>SI No</th>
                  <th>Name of Voucher</th>
                  <th>Voucher Code</th>
                  <th>Percentage (%)</th>
                  <th>Fixed Value ($)</th>
                  <th>Coupon Status</th>
                  <th>Applied Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.voucher_list.map((item, index) => {
  console.log("Voucher item:", item); // 👈 this will print each voucher object
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item?.voucher_name}</td>
      <td>{item?.voucher_code}</td>
      <td>{item?.percentage == 0 ? '-' : item?.percentage}</td>
      <td>{item?.fixed_value == 0 ? '-' : item?.fixed_value}</td>
      <td>
        <span
          className={`badge ${
            item?.redeem_voucher_status == 1 ? 'bg-success' : 'bg-secondary'
          }`}
        >
          {item?.redeem_voucher_status == 1 ? 'Active' : 'Not Active'}
        </span>
      </td>
      <td>{item?.applied_at}</td>
      <td>{renderButton(item)}</td>
    </tr>
  );
})}
              </tbody>
            </Table>
          </div>
        </div>
        :
        <>
          {loading ?
            <div className="loading_view">
              <ClipLoader
                color={"#0082ed"}
                loading={loading}
                //cssOverride={override}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
            :
            <div className="no_data_container">
              <h4>No Voucher Found !</h4>
            </div>
          }
        </>
      }
      <Modal
        show={showModal}
        size="lg"
        onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Warranty Management</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="row">
              {/* Seller Name Input */}
              <div className="form-group mb-3 col-6">
                <label htmlFor="sellerName"><strong>Seller Name</strong><span className="text_red">*</span></label>
                <input
                  type="text"
                  name="sellerName"
                  id="sellerName"
                  placeholder="Seller name"
                  value={formData.sellerName}
                  onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                  className="form-control"
                  disabled={true}
                />
              </div>

              {/* Voucher Code Input */}
              <div className="form-group mb-3 col-6">
                <label htmlFor="voucherCode"><strong>Voucher Redeemed Code</strong><span className="text_red">*</span></label>
                <input
                  type="text"
                  name="voucherCode"
                  id="voucherCode"
                  placeholder="Redeemed code"
                  value={formData.voucherCode}
                  onChange={(e) => setFormData({ ...formData, voucherCode: e.target.value })}
                  className="form-control"
                  disabled={true}
                />
              </div>
              {/* Fix value  and persentage Input */}
              {formData.fixValue > 0 ?
                <div className="form-group mb-3 col-6">
                  <label htmlFor="fixValue"><strong>Fixed Value ($)</strong><span className="text_red">*</span></label>
                  <input
                    type="text"
                    name="fixValue"
                    id="fixValue"
                    placeholder="fix value"
                    value={formData.fixValue}
                    onChange={(e) => setFormData({ ...formData, fixValue: e.target.value })}
                    className="form-control"
                    disabled={true}
                  />
                </div>
                :
                <div className="form-group mb-3 col-6">
                  <label htmlFor="percentage"><strong>Percentage (%)</strong><span className="text_red">*</span></label>
                  <input
                    type="text"
                    name="percentage"
                    id="percentage"
                    placeholder="percentage"
                    value={formData.percentage}
                    onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                    className="form-control"
                    disabled={true}
                  />
                </div>
              }
              {/* User Name Input */}
              <div className="form-group mb-3 col-6">
                <label htmlFor="userName"><strong>User Name</strong><span className="text_red">*</span></label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="user name"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  className="form-control"
                  disabled={true}
                />
              </div>
              {/* User Email Input */}
              <div className="form-group mb-3 col-6">
                <label htmlFor="email"><strong>User Email</strong><span className="text_red">*</span></label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-control"
                  disabled={true}
                />
              </div>

              {/* File upload Input */}
              <div className="form-group mb-3 col-6">
                <label htmlFor="invoice"><strong>Warranty Invoice</strong><span className="text_red">*</span></label>
                <input
                  type="file"
                  name="invoice"
                  id="invoice"
                  placeholder="Choose files"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })} // Handles multiple files
                  className="form-control"
                />
              </div>


              {/* Model No. Input */}
              <div className="form-group mb-3 col-6">
                <label htmlFor="modelNo"><strong>Model No.</strong><span className="text_red">*</span></label>
                <select
                  name="modelNo"
                  id="modelNo"
                  value={formData.modelNo}
                  onChange={(e) => setFormData({ ...formData, modelNo: e.target.value })}
                  className="form-control arrow-select"
                >
                  <option value="">Select Model</option>
                  {voucherData &&
                    voucherData.product.map((item, index) => (
                      <option key={index} value={item.model_no}>
                        {item.model_no}
                      </option>
                    ))}
                </select>
              </div>


              {/* Serial No. Input */}
              <div className="form-group mb-3 col-6">
                <label htmlFor="serialNo"><strong>Serial No.</strong><span className="text_red">* {alreadytaken === true ? 'already taken' : ''} </span></label>
                <input
                  type="text"
                  name="serialNo"
                  id="serialNo"
                  placeholder="serial no."
                  value={formData.serialNo}
                  onChange={async(e) => {
                    if(e.target.value !== ""){
                      requestCheckWarrenty(e.target.value)
                    }
                    setFormData({ ...formData, serialNo: e.target.value });
                  } }
                  className="form-control"
                />
              </div>

              {/* Date of Purchase Input */}
              <div className="form-group mb-3 col-6">
                <label htmlFor="dateOfPurchase">
                  <strong>Date of Purchase</strong>
                  <span className="text_red">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfPurchase"
                  id="dateOfPurchase"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="form-control"
                  min={formData.minDate ? new Date(formData.minDate).toISOString().split('T')[0] : ''} // Corrected date format
                  max={formData.maxDate ? new Date(formData.maxDate).toISOString().split('T')[0] : ''} // Corrected date format
                />
              </div>

              {/* status Input */}
              <div className="form-group mb-3 col-6">
                <label htmlFor="status"><strong>Register Status</strong><span className="text_red">*</span></label>
                <select
                  ref={selectRef}
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-control arrow-select"
                >
                  <option value="">Select Status</option>
                  <option value="success">Success</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formData.file && formData.modelNo && formData.serialNo && formData.date && formData.status ? false : true}
            >
              Create
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <GlobalLoader loading={globalLoading} />
      <ToastContainer transition={Slide} />
    </div>
  );
};

export default Coupon;
