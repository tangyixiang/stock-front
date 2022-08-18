import axios from 'axios'

const api = axios.create({
  baseURL: "http://127.0.0.1:5174",
  method: 'get'
})

export default api