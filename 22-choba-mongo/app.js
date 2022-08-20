// import { MongoClient } from "mongodb";
const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'wpu';

const client = new MongoClient(uri);

client.connect((error, client) => {
  if (error) {
    return console.log('koneksi gagal');
  }

  // pilih database
  const database = client.db(dbName);
  const mahasiswa = database.collection('mahasiswa');

  // // menambahkan 1 data ke collection mahasiswa
  // const mahasiswa = database.collection("mahasiswa");
  // const doc = {
  //     nama: "Intan Permatasari",
  //     email: "intan@gmail.com",
  //   }
  //   mahasiswa.insertOne(doc, (error, result) => {
  //     if (error) {
  //         return console.log('gagal menambahkan data');
  //     }
  //     console.log(result);
  //   });

  //   // menambahkan banyak data
  //   db.collection('mahasiswa').insertMany(
  //     [
  //       {
  //         nama: 'Intan',
  //         email: 'intan@yahoo.com',
  //       },
  //       {
  //         nama: 'afip',
  //         email: 'afip@gmail.com',
  //       },
  //     ],
  //     (error, result) => {
  //       if (error) {
  //         return console.log('data gagal ditambahkan');
  //       }
  //       console.log(result);
  //     }
  //   );

  // // menlihat semua data di collection mahasiswa
  //   console.log(db.collection('mahasiswa').find().toArray((error, result) => {
  //     console.log(result);
  //   }));

  // // menlihat data berdasarkan kriteria di collection mahasiswa
  //   console.log(db.collection('mahasiswa').find({_id: new ObjectId("6300a8c53b7a61ab65bf5e0a")}).toArray((error, result) => {
  //     console.log(result);
  //   }));

  // // mengubah data berdasarkan id
  //    // create a filter for a movie to update
  //    const filter = { _id: new ObjectId("6300a8c53b7a61ab65bf5e0a") };
  //    // this option instructs the method to create a document if no documents match the filter
  //    const options = { upsert: true };
  //    // create a document that sets the plot of the movie
  //    const updateDoc = {
  //      $set: {
  //        nama: 'avip syaifulloh',
  //        email: 'avip@yahoo.com'
  //      },
  //    };
  //    const result = mahasiswa.updateOne(filter, updateDoc, options).then((result) => {
  //     console.log(result);
  //    }).catch((error) => {
  //     console.log(error);
  //    });

  //   // mengubah data lebih dari 1, berdasarkan kriteria
  //   mahasiswa.updateMany(
  //     {
  //       nama: 'Intan',
  //     },
  //     {
  //       $set: {
  //         nama: 'Erik Doank',
  //       },
  //     }
  //   );

  // menghapus 1 data
  mahasiswa.deleteOne({
    _id: ObjectId("6300a8c53b7a61ab65bf5e0a")
  }).then(result => {
    console.log(result);
  }).catch(error => {
    console.log(error);
  })

  
  // menghapus lebih dari 1 data
  mahasiswa.deleteMany({
    nama: 'Intan Permatasari'
  }).then(result => {
    console.log(result);
  }).catch(error => {
    console.log(error);
  })
});
