const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/api');
const cors = require('cors');

app.use(cors());
app.use('/',api);

// statically serve everything in the build folder on the route '/build'
//express.static, 
//allow client to be accessible to the ../build when you are in the file path
//ejs template is used for dyanmic functionality
//css is static
app.use('/build', express.static(path.join(__dirname, '../build')));



app.listen(3000, () => { console.log('Listening on port 3000') }); //listens on port 3000 -> http://localhost:3000/
