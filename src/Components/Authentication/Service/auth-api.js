import { API_BASE_URL } from '../../../config/apiConfig';

export async function login(email, password) {

    let data = await fetch(`${API_BASE_URL}/seller/seller-login`, {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => {
        return response.json();
    }).then(data => {
        return data;
    }).catch(err => {
        console.log(err)
    })

    const authPromise = new Promise((resolve, reject) => {
        if (typeof data.token == 'undefined') {
            reject('Invalid credentials');
        }
        resolve({
            token: data.token,
        });
    });

   
    return authPromise;
}