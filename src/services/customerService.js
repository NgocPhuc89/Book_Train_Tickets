import axios from "axios";

const CUSTOMER_API = `https://json-server-vercel-ten-theta.vercel.app/Customer`;

class CustomerService {

    static getCustomers() {
        return axios.get(CUSTOMER_API);
    }
    static getCustomerSearch(search) {
        return axios.get(CUSTOMER_API + `?${search ? `&q=${encodeURIComponent(search)}` : ''}`);
    }
    static getCustomer(id) {
        return axios.get(CUSTOMER_API + `/${id}`);
    }
    static postCustomer(data) {
        return axios.post(CUSTOMER_API, data);
    }
    static editCustomer(id, data) {
        return axios.patch(CUSTOMER_API + `/${id}`, data);
    }
    static deleteCustomer(id) {
        return axios.delete(CUSTOMER_API + `/${id}`)
    }
}
export default CustomerService;