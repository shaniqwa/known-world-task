const express = require('express');
const http = require('http');

const app = express();

const server = http.Server(app);

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const port = 3000;

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});


