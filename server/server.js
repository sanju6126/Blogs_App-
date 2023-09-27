const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");

const connect = require('./database/conn')
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");




// dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/categories",categoryRoute)


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });



const port = 8000;
// start server only when we have valid connection
connect().then(() => {
    try {
        app.listen(port,() =>{
            console.log(`Server connected to http://localhost:${port}`);
        
        })
    }
    catch (error) {
        console.log('Cannot connect to the server');
    }
}).catch(error => {
    console.log("Invalid database connection");

})
