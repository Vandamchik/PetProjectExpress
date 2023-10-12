const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT ?? 5000;

const app = express();


app.use(cors())
app.use(bodyParser.json());
// app.use(express.json())


app.listen(PORT);
