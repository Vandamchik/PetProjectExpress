require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose= require('mongoose');


const productsRoutes = require('./routes/products-routes.js');
const usersRoutes = require('./routes/users-routes.js');

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/products', productsRoutes);
app.use('/api/auth', usersRoutes);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server start at port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

