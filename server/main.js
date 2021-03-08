const express = require('express');
const http = require('http');

const app = express();

const server = http.Server(app);

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.get('/api/houses', (req, res) => {
	console.log('get houses')
	res.status(200).send([
		{
			"id": 1,
			"name" : "Lannister",
			"position": {
				"x": 260,
				"y": 470
			},
			"strength": 8,
			"flag": "lannister.png"
		},
		{
			"id": 2,
			"name" : "Stark",
			"position": {
				"x": 220,
				"y": 250
			},
			"strength": 7,
			"flag": "stark.png"
		},
		{
			"id": 3,
			"name" : "Targaryen",
			"position": {
				"x": 530,
				"y": 500
			},
			"strength": 9,
			"flag": "targaryen.png"
		},
		{
			"id": 4,
			"name" : "Tyrell",
			"position": {
				"x": 180,
				"y": 440
			},
			"strength": 2,
			"flag": "tyrell.png"
		},
		{
			"id": 5,
			"name" : "Greyjoy",
			"position": {
				"x": 110,
				"y": 380
			},
			"strength": 4,
			"flag": "greyjoy.png"
		},
		{
			"id": 6,
			"name" : "White Walkers",
			"position": {
				"x": 120,
				"y": 50
			},
			"strength": 10,
			"flag": "night_king.png"
		}
	]);
})

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});


