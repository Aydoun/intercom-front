import axios from 'axios';

function checkStatus(res) {
    const data = res.data;
    if (res.status === 200 && data.status) return data.response;

    const error = new Error(data);
    error.response = data.response;
    throw error;
}

export default function request(options) {
    return axios({
        ...options,
        headers: { 'x-api-key': localStorage.getItem('tk') },
        timeout: 15 * 1000,
    })
    .then(checkStatus);
}