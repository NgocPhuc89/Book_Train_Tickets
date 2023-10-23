import axios from "axios";

class LocationRegionService {
    static getAllProvince() {
        return axios.get('https://vapi.vnappmob.com/api/province/')
    }
    static getAllDistrict(provinceId) {
        return axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
    }
    static getAllWard(districtId) {
        return axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
    }
}

export default LocationRegionService;