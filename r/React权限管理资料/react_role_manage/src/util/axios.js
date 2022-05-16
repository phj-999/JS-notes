import Axios from 'axios';

const BASE_URL="http://localhost:8888"
const Server = Axios.create({
    baseURL:BASE_URL,
    timeout:6000 //单位：毫秒
})

//拦截器

export default Server;

