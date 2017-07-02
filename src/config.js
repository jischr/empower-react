let config = {}

if (window.location.origin === 'http://localhost:3001') {
  config['API_URL'] = 'http://localhost:3000'
}
else {
  config['API_URL'] = 'https://empower-api.herokuapp.com'
}

module.exports = config
