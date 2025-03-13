import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const fetchPlayers = () => axios.get(`${API_BASE_URL}/Player`);
export const fetchGameFormats = () => axios.get(`${API_BASE_URL}/GameFormat`);
export const fetchRoles = () => axios.get(`${API_BASE_URL}/Role`);

export default axios.create({ baseURL: API_BASE_URL });