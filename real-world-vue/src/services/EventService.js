import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000, //Throw error if API call takes longer than 10 s
})

/*Nprogress solution, not optimal for multiple API calls
Templates get loaded before API call is returned

Reasons to use Axios interceptors:
- On request to set authorization tokens
- On response to format or filter data before it reaches into your app
- On response to catch 401 not authorized responses

import NProgress from 'nprogress'

apiClient.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

apiClient.interceptors.response.use((response) => {
  NProgress.done()
  return response
})*/

export default {
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  },
}
