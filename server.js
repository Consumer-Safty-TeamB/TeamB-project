const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chalk = require('chalk');
const cookieParser = require("cookie-parser");

// load env vars
dotenv.config({ path : './config/config.env' });

const connectDB= require('./config/db');
const authorization = require('./middleware/authorization')



//routers
const gasReports =  require('./routes/gasReports');
const userRouter = require('./routes/user');
const { application } = require('express');
const { resourceLimits } = require('worker_threads');


//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Enable cors
app.use(cors());

//cookieparser();
app.use(cookieParser());

//Set static folder 
app.use(express.static(path.join(__dirname , 'public_unauthed')));
app.use(userRouter);

//Auth
app.use(authorization);

//Set static folder 
app.use(express.static(path.join(__dirname , 'public')));


// Routes
app.use('/api/v1/messages' , require('./routes/messages'));
app.use('/api/v1/gasReports' , gasReports);


const PORT = process.env.PORT || 3000;

app.listen(PORT , () => console.log(chalk.green.inverse('Server running in ' + process.env.NODE_ENV + 'mode on port ' + PORT)))


