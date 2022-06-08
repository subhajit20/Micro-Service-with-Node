require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const ip = require('ip');
const dayjs = require('dayjs');
const app = express();

/********************** DDeclared Routes *******************/
const { requestnode_route } = require('./routes/requestnode_route')

/********************** mongoose connection ***************/

mongoose.connect(process.env.MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database is connected successfully...')
}).catch((err) => {
    console.log(err)
    console.log('Database is not successfully connected...')
})

/**************** parsing middlewares **************/
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))
const vewDir = (path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));
app.set('view engine', 'ejs');
app.set('views', vewDir);


/*************** Enpoints *********************/
app.get('/', (req, res) => {

    res.status(200).json({
        msg: "This is just a demo endpoint..."
    })
})
app.use(requestnode_route);

app.listen(5000, () => {
    console.log('Server is listening at http://localhost:5000')
})