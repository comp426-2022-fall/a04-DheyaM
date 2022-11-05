import {roll} from "./lib/roll.js";
import express from "express";
import minimist from "minimist";

const app = express()
const args = minimist(process.argv.slice(2));

const port = args.port ? args.port: 5000;



app.get('/app', (req, res, next) => {
	res.statusCode = 200;
    res.statusMessage = "OK"
    res.writeHead(res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+' '+res.statusMessage)
})

app.get('/app/roll', (req, res, next) => {
	res.status(200);
    res.json(JSON.stringify(roll(6, 2, 1)));
})

app.get('/app/roll', (req, res, next) => {
    let side = req.body.sides || req.query.sides;
    let dice = req.body.dice || req.query.dice;
    let roll = req.body.rolls || req.query.rolls;

	res.status(200);
    res.json(JSON.stringify(roll(side,dice,roll)));
})

app.get('/app/roll/:sides', (req, res, next) => {
	res.status(200)
    res.json(JSON.stringify(roll(req.params.sides, 2, 1)));
})

app.get('/app/roll/:sides/:dice', (req, res, next) => {
	res.status(200)
    res.json(JSON.stringify(roll(req.params.sides, req.params.dice, 1)));
})

app.get('/app/roll/:sides/:dice/:rolls', (req, res, next) => {
	res.status(200)
    res.json(JSON.stringify(roll(req.params.sides, req.params.dice, req.params.rolls)));
})

app.use(function(req, res){
	res.status(404).send("404 NOT FOUND");
})

app.listen(port, () => {
	console.log("Server listening on port" + port)
})