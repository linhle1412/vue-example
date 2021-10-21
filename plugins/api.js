function buildQuery(params) {
  if (!params) {
    return '';
  }
  if (typeof params === 'string') {
    return params;
  }
  if (typeof params !== 'object') {
    return '';
  }
  let arr = [];
  for (let key of Object.keys(params)) {
		arr.push(encodeURIComponent(key) + '=' + (typeof params[key] === 'string' ? params[key] : encodeURIComponent(JSON.stringify(params[key]))))
  }
  return '?' + arr.join('&');
}
export default function ({ $axios, app }, inject) {
  // $axios.setToken(localStorage.getItem('user_token'), 'Bearer')
  $axios.setHeader('locale', app.i18n.locale)

  inject('get', (url, params) => {
    return new Promise((resolve, reject) => {
      $axios.$get('api.' + url + buildQuery(params))
        .then((resp) => {
          resolve(resp)
        })
        .catch((e) => reject(e.response.data.error.message))
    })
  })
  inject('post', (url, data) => {
    return new Promise((resolve, reject) => {
      $axios.$post('api.'+url, data)
        .then((resp) => {
          resolve(resp)
        })
        .catch((e) => reject(e.response.data.error.message))
    })
  })
}
