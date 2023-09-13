const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const apiRouter = require('./routes/api');

console.log('im in the server');

// Handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// statically serve everything in the dist folder on route '/'
app.use(express.static(path.join(__dirname, '../dist')));
// Serve static CSS files from the 'css' folder within 'client'
app.use('/stylesheets', express.static(path.join(__dirname, '../client/stylesheets')));
// Serve api routing when creating user / logging in
app.use('/api', apiRouter);




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



