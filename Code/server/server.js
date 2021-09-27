const express = require('express')
const axios = require('axios')

const app = express()


const port = 8589;
const client_ID = '935b318ef8b45a2f42ab' 
const client_secret = 'bb5c6b27d05909f215a25d2d1dc1830b2f2b0b80' 
const authZ_url = 'https://github.com/login/oauth/authorize'; 
const redirect_url = 'http://localhost:8589/oauth/redirect';  


// + Bonus Part
app.get('/oauth/redirect', async (req, res) => {
  console.log(`Github code is: ${req.query.code}`); 

  const res_token = await axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token?' + `client_id = ${client_ID}&` + `client_secret = ${client_secret}&` + `code = ${req.query.code}`,
    headers: {accept: 'application/json'} });

  console.log('Waiting for access token ...');
  console.log(`Access token is: ${res_token.data.access_token}`); 

  const api_result = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: { Authorization: `token ${res_token.data.access_token}`}
  });
  console.log('Waiting for API result ...');
  console.log('Just a moment ...');
  console.log(api_result.data);
  res.send(api_result.data)});

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)}
  res.status(500)
  res.render('error', { error: err })}

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')})

app.use(express.static('public'));

app.get('/', (req, res) => {res.send()})
app.listen(port, () => {console.log(`Server is listening on port: ${port}`)});



