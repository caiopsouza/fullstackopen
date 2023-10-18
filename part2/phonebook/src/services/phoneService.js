import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

function getAll() {
    return axios.get(baseUrl);
}

function post(person) {
    return axios.post(baseUrl, person)
}

function remove(id) {
    return axios.delete(`${baseUrl}/${id}`);
}

export default {getAll, post, remove};
