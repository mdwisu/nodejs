const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
} = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');

// third-party middleware
app.use(expressLayouts);

// built in middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // parsing proses tambah contact

// application level middleware
app.use((req, res, next) => {
  console.log('Time', Date.now());
  next();
});

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
    contacts,
    msg: req.flash('msg'),
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
app.post(
  '/contact',
  [
    body('nama').custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error('Nama contact sudah digunakan');
      }
      return true;
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'Nomor hp tidak valid').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('add-contact', {
        title: 'From Tambah Data Contact',
        layout: 'layouts/main-layout',
        errors: errors.array(),
      });
    }
    addContact(req.body);
    // kirimkan flash massage
    req.flash('msg', 'Data contact berhasil ditambahkan!');
    res.redirect('/contact');
  }
);
// halaman detail contact
app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.nama);
  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'halaman detail contact',
    contact,
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
