const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public')
console.info('publicPath', publicPath)

const port = process.env.PORT || 3000
console.info('port', port)

var app = express();
app.use(express.static(publicPath));
app.listen(port, () => {
    console.info(`Server is up on ${port}`)
});