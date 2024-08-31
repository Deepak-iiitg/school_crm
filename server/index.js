require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT;

const classRouter = require('./routes/classRoutes');
const studentRouter = require('./routes/studentRoutes');
const teacherRouter = require('./routes/teacherRoutes');
const db = require('./models/dbConnection');
db.main().catch(err=>{
    console.log('error while db connection ',err);
})
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors({"origin":true}));

app.use(classRouter);
app.use(teacherRouter);
app.use(studentRouter);

app.listen(PORT || 8080,()=>{
    console.log('server running on port '+PORT);
})