import axios from "axios";

const BASE_URL = 'localhost:3030/decanchitas';

const loginApi = axios.create({
    baseURL: BASE_URL
})

export { loginApi }