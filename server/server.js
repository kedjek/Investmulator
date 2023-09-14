const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const apiRouter = require('./routes/api');
const mongoURI = 'mongodb://localhost/Solo-Project';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Handle parsing request body & cookies 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:8080'}));
app.use(
  session({
    secret: 'A really secure secret key', // Replace with a secret key
    resave: false,
    saveUninitialized: true,
  })
);


// statically serve everything in the dist folder on route '/'
app.use(express.static(path.join(__dirname, '../dist')));// Redirect to the homepage after destroying the session
// app.get('/', (req, res) => {
//   console.log(req.session);
//   req.session.destroy(err => {
//     if (err) {
//       console.error('Error destroying session:', err);
//     }
//   });
// });

// Serve static CSS files from the 'css' folder within 'client'
app.use('/stylesheets', express.static(path.join(__dirname, '../client/stylesheets')));
// Serve api routing when creating user / logging in
app.use('/api', apiRouter);




/*catch-all route handler for any requests to an unknown route*/
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

app.use((err, req, res, next) => {
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



