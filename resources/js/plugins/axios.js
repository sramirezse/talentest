import axios from 'axios'
import store from '../store'
window.toastr = require('toastr')

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

axios.interceptors.request.use(request => {
  if (store.getters['auth/authToken']) {
    request.headers.common['Authorization'] = `Bearer ${store.getters['auth/authToken']}`
  }
  return request
})

// Response interceptor
axios.interceptors.response.use(response =>{
  if (response.status == 200 && response.data.message) {
    toastr.success(response.data.message)
  }
  return response;
}, error => {
  const { status, data } = error.response
  if (status >= 500) {
    toastr.options.closeButton = true;
    toastr.error('ERROR 500', 'Error!');
  }

  if (status === 401 && store.getters['auth/check']) {
    toastr.warning('Session expiro', 'Error!').then(() => {
      store.commit('auth/LOGOUT')
    })
  }
  if (status === 422) {
      data.errors.forEach(async function(rating) {
        toastr.warning(rating, 'Error!');
      })
  }

  return Promise.reject(error)
} )



export default axios