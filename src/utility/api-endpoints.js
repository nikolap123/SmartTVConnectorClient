import axios from "axios"

const API_URL = "http://192.168.50.5:8081"

export const getDevicesWithApplications = () => axios.get(`${API_URL}/get-devices`)

export const getApplications = () => axios.get(`${API_URL}/get-applications`)

export const runCommand = (body) => axios.post(`${API_URL}/run-command`,body,{
    headers: {
        'Content-Type': 'application/json',
    }
})

export const uploadDist = (body) => axios.post(`${API_URL}/upload-dist`,body,{
    headers : {
        "Content-Type" : "undefined"
    }
})

