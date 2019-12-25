import axios from 'axios';

const GET = (endpoint) => {
    return axios.get(endpoint);
}

const POST = (endpoint, payload) => {
    return axios.post(endpoint, payload);
}

const PUT = (endpoint, payload) => {
    return axios.put(endpoint, payload);
}

const PATCH = (endpoint, payload) => {
    return axios.patch(endpoint, payload);
}

const DELETE = (endpoint) => {
    return axios.delete(endpoint);
}

export default {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE
}
