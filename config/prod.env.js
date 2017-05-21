module.exports = {
  NODE_ENV: '"production"',
  URL_ROOT_API: JSON.stringify(process.env.URL_ROOT_API) || '"http://localhost:8000"',
}

console.log('TEST===============:' + JSON.stringify(process.env.URL_ROOT_API))