const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productsRoutes = require('./routes/products-routes');
const usersRoutes = require('./routes/users-routes');

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(cors())
app.use(bodyParser.json());
// app.use(express.json())

app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);

app.listen(PORT);
