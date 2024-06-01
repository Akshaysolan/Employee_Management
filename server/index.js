const express = require("express");
const cors = require('cors');
const { adminRouter } = require('./Routes/AdminRoute.js');

const app = express();

app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use('/auth', adminRouter);

app.use(express.static('Public'))

app.listen(3000, () => {
    console.log("Server is Running on 3000");
});
