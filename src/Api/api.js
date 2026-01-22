export const HaloFotoApi = {
    getData: async function(menuItem) {
        const response = await fetch(`http://103.191.208.50/~gewlisca/halofoto_new/api/${menuItem}`);
        const data =  response.json();
        return data;
    }
}

