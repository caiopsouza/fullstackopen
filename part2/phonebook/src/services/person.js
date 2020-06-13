import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl);

const create = (obj) => axios.post(baseUrl, obj);

const update = (id, obj) => axios.put(`${baseUrl}/${id}`, obj);

const remove = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getAll, create, update, remove };
