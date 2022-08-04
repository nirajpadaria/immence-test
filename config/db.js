const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test')
.then(() => {
    console.log('DB Connected..');
}).catch((error) => {
    console.error(error + 'DB Connection Failed');
});