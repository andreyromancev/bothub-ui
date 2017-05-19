module.exports = {
  NODE_ENV: '"production"',
  URL_ROOT_API: JSON.stringify(process.env.URL_ROOT_API) || '"http://localhost:8000"',
  URL_API_AUTH: JSON.stringify(process.env.URL_API_AUTH) || '"/api-token-auth/"',
}
