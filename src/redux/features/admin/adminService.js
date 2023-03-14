import axios from 'axios'

export const getLogin = async(data) =>{
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`,data);
    return response.data;
}
