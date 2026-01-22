import { API_BASE_URL } from '../config/apiConfig';

export const HaloFotoApi = {
    getData: async function(menuItem) {
        const response = await fetch(`${API_BASE_URL}/${menuItem}`);
        const data =  response.json();
        return data;
    }
}

