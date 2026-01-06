const express = require('express');
const {dbConnect}= require('./config/db.js');
const dotenv = require('dotenv');
// dot env config
dotenv.config();
const {router}= require('./routes/taskRoutes.js');
const cors = require('cors');
const app = express();
app.use(cors(
    {
        origin: 'http://localhost:5173' // Allow requests from your frontend domain
    }
));
const PORT = process.env.PORT;
//connecting to Database
dbConnect();
//parsing Json request body
app.use(express.json());
//using routes 
app.use(router);






//starting server by binding it to a network port
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
});