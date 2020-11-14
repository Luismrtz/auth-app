import express from 'express';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoutes';
import "regenerator-runtime/runtime.js";
// import todoRoute from './routes/todoRoutes';

const cors = require("cors");

//express
const app = express();
//using bodyparser instead of app.use(express.json());
app.use(bodyParser.json());
app.use(cors());




//mongoose
const mongoUri = config.MONGO_URI;
mongoose.connect( mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser:true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if(err) throw err;
    console.log("MongoDB connection established");
});

app.use('/users', userRoute);

app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/build/index.html'));
});
app.listen(config.PORT, () => {console.log(`server started at port: ${config.PORT}`)});
