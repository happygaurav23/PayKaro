const express = require("express");
const app = express();
const cors = require("cors");

const router = require('./routes/index');
app.use(express.json());
app.use(cors());

app.use('/api/v1',router);

app.listen(3000,()=>{
    console.log("Server Started");
})


