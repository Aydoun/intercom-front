import axios from 'axios';
import { getToken } from 'utils';

function checkStatus(res) {
    const data = res.data;
    if (res.status === 200 && data.status) return data;

    const error = new Error(data);
    error.response = data.response;
    throw error;
}

export default function request(options) {
    return axios({
        ...options,
        headers: { 'x-api-key': getToken() },
        timeout: 10 * 1000,
    })
    .then(checkStatus);
}