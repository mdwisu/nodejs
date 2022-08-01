// core module
// file system
const fs = require('fs');
// import fs from 'fs';

// menuliskan string ke file (sync)
// try {
//     fs.writeFileSync('data/test.txt', 'Hello World secara synchronous!')
// } catch (error) {
//     console.log(error);
// }

// menuliskan string ke file (async)
// fs.writeFile('data/test.txt', 'Hallo World secara asynchronous', (e) => {
//     console.log(e);
// })

// membaca isi file (sync)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);
// membaca isi file (async)
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });


// readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukan nama anda : ', (nama) => {
    rl.question('Masukan nomor HP anda : ', (noHP) => {
        const contact = { nama, noHP };
        const file = fs.readFileSync('data/contacts.json', 'utf8');
        const contacts = JSON.parse(file);

        contacts.push(contact);

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
        console.log('terimakasih');
        rl.close();
    });
});