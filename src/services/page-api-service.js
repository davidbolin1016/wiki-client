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
      )
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
    },
  
  getPageList() {
    return fetch(`${config.API_ENDPOINT}/pages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
    }})
    .then(res => {
      return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() }
    );
  },

  deletePage(id) {
    return fetch(`${config.API_ENDPOINT}/pages/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }})
      .then(res => {
        console.log(res);
        return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res }
      );
  },

  updatePage(id, updates) {
    console.log(id, updates);
    return fetch(`${config.API_ENDPOINT}/pages/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(updates)
    })
      .then(res => {
        console.log(res);
        return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res });
  }
}

export default PageApiService;