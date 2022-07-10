
import axios from '../plugins/axios'

export default {
    async signin (params) {
        return await axios.post(`/api/auth/login`, params)
    },
    async me () {
        return await axios.get('/api/auth/user')
    },
    async logout() {
        return await axios.get(`/api/auth/logout`)
    },
    async refresh () {
        return await axios.post(`/api/refresh`)
    },
}
