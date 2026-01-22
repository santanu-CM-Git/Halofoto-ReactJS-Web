import axios from 'axios';

export async function searchMembershipById(token, user_membership_id) {
    try {
        axios.defaults.withXSRFToken = true;
        const response = await axios.post(`http://103.191.208.50/~gewlisca/halofoto_new/api/seller/search-membership-id`, {user_membership_id },
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
        const response = await axios.post(`http://103.191.208.50/~gewlisca/halofoto_new/api/seller/get-voucher-details`, { voucher_id },
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
    formData.append('register_status', data.status);
    formData.append('invoice', data.file);
    // formData.forEach((value, key) => {
    //     console.log(`${key}: ${value}`);
    // });
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
            `http://103.191.208.50/~gewlisca/halofoto_new/api/seller/add-warranty`,
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
            `http://103.191.208.50/~gewlisca/halofoto_new/api/seller/check-warranty`,
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

