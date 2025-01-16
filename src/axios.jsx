import {BaseUrl} from './constants/Constant'
import axios from 'axios'

const instance = axios.create({
    baseURL: BaseUrl,
   
  });
  export default instance