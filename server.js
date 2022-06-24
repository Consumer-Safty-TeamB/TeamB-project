const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB= require('./config/db');
const chalk = require('chalk');

//routers
const gasReports =  require('./routes/gasReports');
const userRouter = require('./routes/user');
const { application } = require('express');

// load env vars
dotenv.config({ path : './config/config.env' });

//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Enable cors
app.use(cors());

//Set static folder 
app.use(express.static(path.join(__dirname , 'public')));

// Routes
app.use('/api/v1/gasReports' , gasReports);
app.use(userRouter);
app.use('/api/v1/messages' , require('./routes/messages'));

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(chalk.green.inverse('Server running in ' + process.env.NODE_ENV + 'mode on port ' + PORT)))