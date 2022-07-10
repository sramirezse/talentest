
import axios from '../plugins/axios'

export default {
    async save (params) {
        return await axios.post(`/api/block`, params)
    },
    async get (params) {
        return await axios.get(`/api/block`, {params:params})
    },
}
