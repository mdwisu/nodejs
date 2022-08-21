const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/wpu');

// // menambahkan 1 data
// const contact1 = new Contact({
//     nama: 'shandika',
//     nohp: '081218386051',
//     email: 'shandika@gmail.com'
// })

// // Simpan ke collection
// contact1.save().then(contact => console.log(contact))