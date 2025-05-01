import axios from 'axios';
const token = localStorage.getItem('@token');
const axiosInstance = axios.create({
// baseURL: 'http://localhost:5000/api',
  baseURL:'https://freelance-job-mgmt-backend.onrender.com/api',
    timeout: 5000,
        headers: {
           'Authorization': token ? `Bearer ${token}` : '',
            'Accept': 'application/json'
        }
});
export default axiosInstance;
