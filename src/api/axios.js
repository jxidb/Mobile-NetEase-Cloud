import axios from 'axios'

const requests = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 50000
})

requests.interceptors.request.use((config) => {
  return config
})

requests.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return err
  }
)

export default requests
