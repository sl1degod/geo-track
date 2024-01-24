import axios from "axios";
import router from "../router/index"

const api = axios.create()

api.interceptors.request.use(config => {
    if(localStorage.access_token) {
        config.headers.authorization = `Bearer ${localStorage.access_token}`
    }

    return config
},error => {
    console.log(error)
})

api.interceptors.response.use(config => {
    if(localStorage.access_token) {
        config.headers.authorization = `Bearer ${localStorage.access_token}`
    }

    return config
}, error => {

    if(error.response.data.message === 'Token has expired') {
        axios.post('api/auth/refresh', {}, {
            headers: {
                'authorization': `Bearer ${localStorage.access_token}`
            }
        }).then(response => {
            localStorage.access_token = response.data.access_token

            error.config.headers.authorization = `Bearer ${response.data.access_token}`

            return api.request(error.config)
        })
    }

    if(error.response.status === 401) {
        router.push('/login')
    }
})

export default api