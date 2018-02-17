const express = require('express');
const Rx = require('rxjs');
const { sse } = require('./sse');

const data = [];
const connections = [];
const app = express();
app.use(express.json());
app.use(sse);
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

const datain$ = Rx.Observable.create(observer => {
	console.log('here');
	app.post('/data', (req, res) => {
		observer.next(req.body);
		res.status(204).send();
	});
});

app.get('/data', (req, res) => {
	res.json(data);
});

app.get('/stream', function(req, res) {
	res.sseSetup();
	connections.push(res);
});

datain$.subscribe(x => {
	connections.forEach(connection => connection.sseSend(x));
	data.push(x);
});

app.listen(3000, () => console.info('running on port 3000'));
