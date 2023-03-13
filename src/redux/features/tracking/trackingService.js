import axios from 'axios';

// Get all tracking
export const getAllTracking = async()=>{
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tracking`);
    return response.data;
}

// Get tracking by id
export const getTrackingById = async(id)=>{
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tracking/${id}`);
    return response.data;
}

// Add tracking
export const addNewTracking = async(data)=>{
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/tracking`, data);
    return response.data;
}

// Delete tracking
export const deleteOneTracking = async(id)=>{
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/tracking/${id}`);
    return response.data;
}

// Update tracking
export const updateOneTracking = async(id,data)=>{
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/tracking/${id}`,data);
    return response.data;
}

