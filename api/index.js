const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// const whiteList = ['http://localhost:3000'];
// const corsOptions = {
//     origin: (origin, callback) => {
//         const existe = whiteList.some(dominio => dominio === origin);
//         if (existe) {
//             callback(null, true);
//         } else {
//             callback(new Error('No permitido por CORS'));
//         }
//     }
// };

// app.use(cors(corsOptions));

app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/veterinaria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());

app.listen(4000, () => {
    console.log('Server running');
});