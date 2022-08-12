const express = require('express');
const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');

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
    nama: 'Muhammad Dwi Susanto',
    title: 'Home',
    mahasiswa,
  });
});
app.get('/about', (req, res) => {
  res.render('about', {title: 'halaman about'});
});
app.get('/contact', (req, res) => {
  res.render('contact', {title: 'halaman contact'});
});
app.get('/product/:id', (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`
  );
});

app.use('/', (req, res) => {
  res.status(404);
  res.send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
