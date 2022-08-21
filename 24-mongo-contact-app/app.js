const express = require('express');
const expressLayouts = require('express-ejs-layouts');
// flash
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./utils/db');
const Contact = require('./models/contact');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Mongo Contact App | Listening at http://localhost:${port}`);
});

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // parsing proses tambah contact

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
// !halaman home
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

//   !halaman about
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'halaman about',
  });
});

// ! contact
// halaman utama
app.get('/contact', async (req, res) => {
  //   Contact.find().then((contact) => {
  //     res.send(contact);
  //   });

  const contacts = await Contact.find();
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'halaman contact',
    contacts,
    msg: req.flash('msg'),
  });
});
// halaman detail contact
app.get('/contact/:nama', async(req, res) => {
  const contact = await Contact.findOne( {nama: req.params.nama} )

  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'halaman detail contact',
    contact,
  });
});
