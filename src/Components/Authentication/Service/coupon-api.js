import axios from 'axios';
import { API_BASE_URL } from '../../../config/apiConfig';

export async function searchMembershipById(token, user_membership_id) {
    try {
        axios.defaults.withXSRFToken = true;
        const response = await axios.post(`${API_BASE_URL}/seller/search-membership-id`, {user_membership_id },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;

    } catch (error) {
        //console.log("Error", error);
        throw error;
    }
}

export async function getVoucherDetails(token, voucher_id) {
    try {
        axios.defaults.withXSRFToken = true;
        const response = await axios.post(`${API_BASE_URL}/seller/get-voucher-details`, { voucher_id },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;

    } catch (error) {
        console.log("Error", error);
        throw error;
    }
}

export async function addWarranty(token, data) {

    let formData = new FormData();
    formData.append('seller_name', data.sellerName);
    formData.append('user_name', data.userName);
    formData.append('user_email', data.email);
    formData.append('model_no', data.modelNo);
    formData.append('serial_no', data.serialNo);
    formData.append('date_of_purchase', data.date);
    formData.append('voucher_user_id', data.id);
    formData.append('coupon_code', data.voucherCode);
    formData.append('coupon_percentage', data.percentage);
    formData.append('fixed_value', data.fixValue);
    formData.append('register_status', 'success');
    formData.append('invoice', data.file);
    // formData.forEach((value, key) => {
    //     console.log(`${key}: ${value}`);
    // });
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
            `${API_BASE_URL}/seller/add-warranty`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function isCheckWarranty(token, serialNo) {

    let formData = new FormData();
    formData.append('serial_no', serialNo);
    // formData.forEach((value, key) => {
    //     console.log(`${key}: ${value}`);
    // });
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
            `${API_BASE_URL}/seller/check-warranty`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function getViewVoucherRedeem(token, voucher_id) {
    try {
        axios.defaults.withXSRFToken = true;
        const response = await axios.get(`${API_BASE_URL}/seller/view-voucher-redeem/${voucher_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log("Error", error);
        throw error;
    }
}

export async function updateVoucherRedeem(token, id, data) {
    console.log('=== UPDATE VOUCHER REDEEM API CALL ===');
    console.log('Update data received:', data);
    console.log('Update id received:', id);
    console.log('API URL:', `${API_BASE_URL}/seller/update-voucher-redeem`);
    
    let formData = new FormData();
    formData.append('id', id);
    formData.append('seller_name', data.sellerName);
    formData.append('user_name', data.userName);
    formData.append('user_email', data.email);
    formData.append('model_no', data.modelNo);
    formData.append('serial_no', data.serialNo);
    formData.append('date_of_purchase', data.date);
    formData.append('coupon_code', data.voucherCode);
    formData.append('coupon_percentage', data.percentage);
    formData.append('fixed_value', data.fixValue);
    formData.append('register_status', 'success');
    if (data.file) {
        formData.append('invoice', data.file);
    }

    // Log FormData contents properly
    console.log('FormData contents:');
    for (let pair of formData.entries()) {
        console.log(`  ${pair[0]}: ${pair[1]}`);
    }
    console.log('=====================================');
    
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
            `${API_BASE_URL}/seller/update-voucher-redeem`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('Update API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Update API Error:', error);
        console.error('Error Response:', error.response?.data);
        console.error('Error Status:', error.response?.status);
        throw error;
    }
}

