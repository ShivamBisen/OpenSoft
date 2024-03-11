const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const connection = require('./db')
const usersroute = require('./route/users');
const authroute = require('./route/auth')

const dotenv = require('dotenv');
dotenv.config();

connection();

app.use(cors());
app.use(express.json());

app.use('/users', usersroute);
app.use('/auth', authroute);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})