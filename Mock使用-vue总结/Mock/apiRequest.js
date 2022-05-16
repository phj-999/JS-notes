import axios from 'axios'

export const getUserDate = () => {
    return axios.request({
        url:'localhost:3000/api/user',
        method:'get'
    })
}