import axios from "axios";

class CustomerService {

    static getCustomers() {
        return axios.get(`http://localhost:3000/Customer`);
    }
    static getCustomerSearch(search) {
        return axios.get(`http://localhost:3000/Customer?${search ? `&q=${encodeURIComponent(search)}` : ''}`);
    }
    static getCustomer(id) {
        return axios.get(`http://localhost:3000/Customer/${id}`);
    }
    static postCustomer(data) {
        return axios.post('http://localhost:3000/Customer', data);
    }
    static putCustomer(id, data) {
        return axios.put(`http://localhost:3000/Customer/${id}`, data);
    }
    static deleteCustomer(id) {
        return axios.delete(`http://localhost:3000/Customer/${id}`)
    }
}
export default CustomerService;