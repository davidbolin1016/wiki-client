import config from '../config'
import TokenService from './token-service';

const PageApiService = {
  getPage(id) {
    return fetch(`${config.API_ENDPOINT}/pages/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }})
      .then(res => {
        return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() }
      );
    },
  submitPage(page) {
    return fetch(`${config.API_ENDPOINT}/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(page)
    })
      .then(res => {
        return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() }
      );
    }}

export default PageApiService;