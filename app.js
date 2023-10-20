require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose= require('mongoose');

const routers = require('./routes/index');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', routers);

app.use(errorMiddleware);

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

