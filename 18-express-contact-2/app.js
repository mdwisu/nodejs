const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact } = require('./utils/contacts');

const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');

// third-party middleware
app.use(expressLayouts);

// built in middleware
app.use(express.static('public'));
app.use(express.urlencoded()) // parsing proses tambah contact

// application level middleware
app.use((req, res, next) => {
  console.log('Time', Date.now());
  next();
});
// ! section route
// ! home
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

// ! about
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'halaman about',
  });
});

// ! contact
// halaman utama
app.get('/contact', (req, res) => {
  const contacts = loadContact();
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'halaman contact',
    contacts
  });
});
// halaman tambah data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    layout: 'layouts/main-layout',
    title: 'halaman tambah data contact',
  });
});
// proses tambah data contact
app.post('/contact', (req, res) => {
  addContact(req.body);
  res.redirect('/contact')
})
// halaman detail contact
app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'halaman detail contact',
    contact
  });
});
// ! end of section

app.use((req, res) => {
  res.status(404);
  res.send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
