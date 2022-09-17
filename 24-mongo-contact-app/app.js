const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const { body, validationResult, check } = require('express-validator');

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

// method override
app.use(methodOverride('_method'));

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
  const contacts = await Contact.find();
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
    body('nama').custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
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
    Contact.insertMany(req.body, (error, result) => {
      // kirimkan flash massage
      req.flash('msg', 'Data contact berhasil ditambahkan!');
      res.redirect('/contact');
    });
  }
);
// proses delete contact
app.delete('/contact', (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    // kirimkan flash massage
    req.flash('msg', 'Data contact berhasil dihapus!');
    res.redirect('/contact');
  });
});
// halaman ubah data contact
app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render('edit-contact', {
    layout: 'layouts/main-layout',
    title: 'halaman ubah data contact',
    contact,
  });
});
// proses ubah data
app.put(
  '/contact',
  [
    body('nama').custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
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
      res.render('edit-contact', {
        title: 'From ubah Data Contact',
        layout: 'layouts/main-layout',
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      ).then((result) => {
        // kirimkan flash massage
        req.flash('msg', 'Data contact berhasil diubah!');
        res.redirect('/contact');
      })
    }
  }
);
// halaman detail contact
app.get('/contact/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'halaman detail contact',
    contact,
  });
});
