import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./Coupon.css";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { AuthContext } from "./store/authContext";
import "../Common/css/loader.css";
import { searchMembershipById, getVoucherDetails, addWarranty, isCheckWarranty, getViewVoucherRedeem, updateVoucherRedeem } from './Service/coupon-api'
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
  status: 'success'
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
  const [existingInvoiceUrl, setExistingInvoiceUrl] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [redeemRecordId, setRedeemRecordId] = useState(null);

  const selectRef = useRef();

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000);
  }, []);

  useEffect(() => {
    console.log("voucherData", voucherData);
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
      // Only reset when modal is closed, not when opening
      setFormData(defaultFormData);
      setExistingInvoiceUrl('');
      setIsEditMode(false);
      setRedeemRecordId(null);
      setAlreadyTaken(false);
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
    console.log('=== FORM SUBMIT ===');
    console.log('Form submit - formData:', formData);
    console.log('Form submit - isEditMode:', isEditMode);
    console.log('Form submit - redeemRecordId:', redeemRecordId);
    console.log('==================');
    setGlobalLoading(true);
    try {
      let response;
      
      // Check if we're in edit mode (if existingInvoiceUrl exists, we're editing)
      if (isEditMode && redeemRecordId) {
        // Update existing voucher redeem - use redeemRecordId (the id from response)
        response = await updateVoucherRedeem(authCtx.token.token, redeemRecordId, formData);
      } else {
        // Create new warranty
        response = await addWarranty(authCtx.token.token, formData);
      }
      
      if (response.status) {
        toast.success(response.message, { position: toast.POSITION.TOP_RIGHT, closeButton: true });
        setShowModal(false);
        if (!isEditMode) {
          updateVoucherDetails(formData.id);
        }
      } else {
        setShowModal(true);
      }
    } catch (error) {
      toast.error("Error saving data:", error.message || error, { position: toast.POSITION.TOP_RIGHT, closeButton: true });
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
        setFormData({ ...formData, id: id, status: 'success' });
        setIsEditMode(false); // New application, not edit mode
        console.log("Membership data found:", response.data);
      } else {
        setVoucherData(null);
        setFormData({ ...formData, id: '', status: 'success' });
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Error fetching membership data:", error.message || error);
    } finally {
      setGlobalLoading(false);
    }
  };

  const onViewEditVoucherHandle = async (id) => {
    if (!authCtx?.token?.token) {
      console.error("Authentication token is missing.");
      return;
    }
    setGlobalLoading(true);
    try {
      // Get submitted warranty data
      const redeemDataResponse = await getViewVoucherRedeem(authCtx.token.token, id);
      
      if (redeemDataResponse.status) {
        // Handle array response - take first element if it's an array
        let redeemData = redeemDataResponse.data;
        if (Array.isArray(redeemData) && redeemData.length > 0) {
          redeemData = redeemData[0];
        }
        
        console.log("Redeem data found:", redeemData);
        
        // Store the redeem record ID (this is the ID used for update API)
        setRedeemRecordId(redeemData.id);
        
        // Also fetch voucher details to populate product dropdown
        let voucherDetailsData = null;
        try {
          const voucherDetailsResponse = await getVoucherDetails(authCtx.token.token, id);
          if (voucherDetailsResponse.status) {
            voucherDetailsData = voucherDetailsResponse.data;
            setVoucherData(voucherDetailsData);
          }
        } catch (voucherError) {
          console.warn("Could not fetch voucher details:", voucherError);
          // Continue with redeem data only
        }
        
        // Populate form with submitted data - map from response structure
        const formDataToSet = {
          id: id,
          sellerName: redeemData.seller?.name || redeemData.seller_name || '',
          voucherCode: redeemData.coupon_code || '',
          fixValue: redeemData.fixed_value || '',
          percentage: redeemData.coupon_percentage || redeemData.percentage || '',
          userName: redeemData.user?.name || redeemData.user_name || '',
          email: redeemData.user?.email || redeemData.user_email || '',
          file: '', // File input can't be set from URL, user needs to re-upload if changing
          modelNo: redeemData.model_no || redeemData.product?.model_no || '',
          serialNo: redeemData.serial_no || '',
          date: redeemData.date_of_purchase || '',
          minDate: redeemData.vocher_start_date || redeemData.voucher_start_date || (voucherDetailsData?.vocher_start_date) || (voucherDetailsData?.voucher_start_date) || '',
          maxDate: redeemData.voucher_end_date || (voucherDetailsData?.voucher_end_date) || '',
          status: 'success'
        };
        
        setFormData(formDataToSet);
        
        // Store existing invoice URL for display
        setExistingInvoiceUrl(redeemData.invoice || '');
        
        // Set edit mode to true since we're viewing/editing existing data
        setIsEditMode(true);
        
        // Set voucher data if product list is available in response but voucher details weren't fetched
        if (redeemData.product && !voucherDetailsData) {
          // Create a structure similar to what getVoucherDetails returns
          setVoucherData({
            product: [redeemData.product]
          });
        }
        
        setShowModal(true);
      } else {
        setVoucherData(null);
        setFormData(defaultFormData);
      }
    } catch (error) {
      console.error("Error fetching voucher redeem data:", error.message || error);
      toast.error("Error loading voucher data", { position: toast.POSITION.TOP_RIGHT, closeButton: true });
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
            {item?.voucher_code_apply == 'Already applied' ? 'Sudah Digunakan' : 'Gunakan'}
          </button>
        );
      case '1':
        return (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button type="button" className="btn btn-warning btn-sm">
              {item?.voucher_code_apply == 'Already applied' ? 'Sudah Digunakan' : 'Gunakan'}
            </button>
            <button 
              type="button" 
              className="btn btn-info btn-sm"
              onClick={() => onViewEditVoucherHandle(item.voucher_id)}
            >
              Lihat/Edit
            </button>
          </div>
        );
      case '2':
        return (
          <button type="button" className="btn btn-secondary btn-sm">
            Tidak tersedia
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
        setFormData((prevData) => ({ ...prevData, status: 'success' }));
      }else{
        setAlreadyTaken(true)
        setFormData((prevData) => ({ ...prevData, status: 'success' }));
      }
    
    } catch (error) {
      console.error("Error fetching membership data:", error?.message || error);
    } finally {
      setGlobalLoading(false);
    }
    
  }


  const handleClose = () => {
    setShowModal(false);
    setAlreadyTaken(false);
    setExistingInvoiceUrl('');
    setIsEditMode(false);
    setRedeemRecordId(null);
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
        <h3>Validasi Voucher</h3>
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
            className="apply_btn">Gunakan</button>
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
                  <th>No</th>
                  <th>Nama Voucher</th>
                  <th>Kode Voucher</th>
                  <th>Diskon (%)</th>
                  <th>Diskon (Rp)</th>
                  <th>Status Kupon</th>
                  <th>Tanggal Digunakan</th>
                  <th>Keterangan</th>
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
          {item?.redeem_voucher_status == 1 ? 'Aktif' : 'Tidak Aktif'}
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
            <Modal.Title>Voucher Management</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="row">
              {/* Seller Name Input */}
              <div className="form-group mb-3 col-6">
                <label htmlFor="sellerName"><strong>Nama Toko</strong><span className="text_red">*</span></label>
                <input
                  type="text"
                  name="sellerName"
                  id="sellerName"
                  placeholder="Nama Toko"
                  value={formData.sellerName}
                  onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                  className="form-control"
                  disabled={true}
                />
              </div>

              {/* Voucher Code Input */}
              <div className="form-group mb-3 col-6">
                <label htmlFor="voucherCode"><strong>Kode Voucher</strong><span className="text_red">*</span></label>
                <input
                  type="text"
                  name="voucherCode"
                  id="voucherCode"
                  placeholder="Kode Voucher"
                  value={formData.voucherCode}
                  onChange={(e) => setFormData({ ...formData, voucherCode: e.target.value })}
                  className="form-control"
                  disabled={true}
                />
              </div>
              {/* Fix value  and persentage Input */}
              {formData.fixValue > 0 ?
                <div className="form-group mb-3 col-6">
                  <label htmlFor="fixValue"><strong>Diskon (Rp)</strong><span className="text_red">*</span></label>
                  <input
                    type="text"
                    name="fixValue"
                    id="fixValue"
                    placeholder="Diskon (Rp)"
                    value={formData.fixValue}
                    onChange={(e) => setFormData({ ...formData, fixValue: e.target.value })}
                    className="form-control"
                    disabled={true}
                  />
                </div>
                :
                <div className="form-group mb-3 col-6">
                  <label htmlFor="percentage"><strong>Diskon (%)</strong><span className="text_red">*</span></label>
                  <input
                    type="text"
                    name="percentage"
                    id="percentage"
                    placeholder="Diskon (%)"
                    value={formData.percentage}
                    onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                    className="form-control"
                    disabled={true}
                  />
                </div>
              }
              {/* User Name Input */}
              <div className="form-group mb-3 col-6">
                <label htmlFor="userName"><strong>Nama User</strong><span className="text_red">*</span></label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Nama User"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  className="form-control"
                  disabled={true}
                />
              </div>
              {/* User Email Input */}
              <div className="form-group mb-3 col-6">
                <label htmlFor="email"><strong>Email User</strong><span className="text_red">*</span></label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email User"
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
                  placeholder="Pilih File"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })} // Handles multiple files
                  className="form-control"
                />
                {existingInvoiceUrl && (
                  <div className="mt-2">
                    <small className="text-muted">Invoice Saat Ini: </small>
                    <a href={existingInvoiceUrl} target="_blank" rel="noopener noreferrer" className="ms-2">
                      Lihat Invoice Saat Ini
                    </a>
                  </div>
                )}
              </div>


              {/* Model No. Input */}
              <div className="form-group mb-3 col-6">
                <label htmlFor="modelNo"><strong>Model No</strong><span className="text_red">*</span></label>
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
                  <strong>Tanggal Pembelian</strong>
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
                <label htmlFor="status"><strong>Status Registrasi</strong><span className="text_red">*</span></label>
                <select
                  ref={selectRef}
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-control arrow-select"
                >
                  <option value="">Pilih Status</option>
                  <option value="success">Sukses</option>
                  <option value="pending">Tertunda</option>
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Batalkan
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={
                formData.modelNo && 
                formData.serialNo && 
                formData.date && 
                formData.status && 
                (isEditMode ? (formData.file || existingInvoiceUrl) : formData.file)
                  ? false 
                  : true
              }
            >
              {isEditMode ? 'Update' : 'Buat'}
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
