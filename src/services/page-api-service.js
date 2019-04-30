import config from '../config'

const PageApiService = {
  getPage(id) {
    return fetch(`${config.API_ENDPOINT}/pages/${id}`)
      .then(res => {
        return (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() }
      );
    }
};

export default PageApiService;