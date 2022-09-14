// const express = require('express');
import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response, next) => {
	res.send('Hello from node with ts project! testing!');
});

app.get('/hi', (req: Request, res: Response, next) => {
	res.send('bye');
});

app.listen(3000, () => {
	console.log('Listening at 3000');
});
