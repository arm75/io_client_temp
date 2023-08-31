import axios from 'axios'

const useAxios = (baseURL: string) => {
  const axiosInstance = axios.create({ 
    baseURL,
    withCredentials: true
   })  
  return axiosInstance
}

export default useAxios
