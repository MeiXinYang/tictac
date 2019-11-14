import axios from "axios";
import config from "../config/config"

var weatherInstance = axios.create({
    baseURL: config.url,
    timeout: config.timeOut
});

weatherInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
})

export default weatherInstance;
