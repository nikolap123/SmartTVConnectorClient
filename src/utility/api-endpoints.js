import axios from "axios"

const API_URL = "http://localhost:8081"

export const getDevicesWithApplications = () => axios.get(`${API_URL}/get-devices`)

export const runCommand = (body) => axios.post(`${API_URL}/run-command`,body)

export const uploadDist = (body) => axios.post(`${API_URL}/upload-dist`,body)

