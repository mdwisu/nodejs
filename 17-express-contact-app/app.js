const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const path = require('path')
const fs = require('fs')
const app = express();
const port = 3000;

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
});
// gunakan ejs
app.set('view engine', 'ejs');
// third-party middleware
app.use(expressLayouts);
app.use(morgan('combined', { stream: accessLogStream }));

// built in middleware
app.use(express.static('public'));

// application level middleware
app.use((req, res, next) => {
  console.log('Time', Date.now());
  next();
});

app.get('/', (req, res) => {
  // res.sendFile('./index.html', { root: __dirname });
  const mahasiswa = [
    {
      nama: 'dwisusanto',
      email: 'dwisusanto784@gmail.com',
    },
    {
      nama: 'intanpermatasari',
      email: 'intan@gmail.com',
    },
    {
      nama: 'shandikagalih',
      email: 'shandika@gmail.com',
    },
  ];
  res.render('index', {
    layout: 'layouts/main-layout',
    nama: 'Muhammad Dwi Susanto',
    title: 'Home',
    mahasiswa,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'halaman about',
  });
});
app.get('/contact', (req, res) => {
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'halaman contact',
  });
});
app.get('/product/:id', (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`
  );
});

app.use((req, res) => {
  res.status(404);
  res.send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
