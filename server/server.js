const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

console.log('is the server running?');
// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  console.log('hello?');
  return res.status(200).sendFile(path.join(__dirname, './client/index.html'));
});

app.get('/createuser', (req, res) => {
  console.log('im creating user');
  return res.status(200).sendFile(path.join(__dirname, './client/index.html'));
});


/*catch-all route handler for any requests to an unknown route*/
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

app.use((err, req, res, next) => {
  console.log('IM IN THE GLOBAL ERRRORRR');
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


/*start server*/
module.exports = app.listen(port, () => { console.log(`Server listening on port: ${port}...`);});



