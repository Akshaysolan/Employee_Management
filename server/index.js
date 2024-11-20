const express = require("express");
const cors = require('cors');
const { adminRouter } = require('./Routes/AdminRoute.js');
require('dotenv').config();
const cookieParser = require('cookie-parser');



const app = express();

app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}));

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', adminRouter);

app.use(cookieParser());

app.use(express.static('Public'))

app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
});
