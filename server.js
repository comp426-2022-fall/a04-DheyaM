#!/usr/bin/env node

import Roll from "./lib/lib/roll.js";
import express from "express";
import minimist from "minimist";

const app = express()
const args = minimist(process.argv.slice(2));
const port = args.port ? args.port: 5000;

app.get('/app', (req, res) => {
	res.send("200 OK");
    res.end()
})

app.get('/app/roll', (req, res, next) => {
	// res.status(200);
    res.send(Roll(6, 2, 1));
    res.end()
})

app.get('/app/roll/:sides', (req, res, next) => {
	// res.status(200)
    res.send(Roll(parseInt(req.params.sides), 2, 1));
    res.end()
})

app.get('/app/roll/:sides/:dice', (req, res, next) => {
	// res.status(200);
    res.send(Roll(parseInt(req.params.sides), parseInt(req.params.dice), 1));
    res.end()
})

app.use('/app/roll/:sides/:dice/:rolls', (req, res, next) => {
	// res.status(200);
    res.send(Roll(parseInt(req.params.sides), parseInt(req.params.dice), parseInt(req.params.rolls)));
    res.end()
})


app.use('/app/roll', (req, res, next) => {
    var side = req.params.sides ? parseInt(req.params.sides) : 6;
    var dice = req.params.dice ? parseInt(req.params.dice) : 2;
    var roll = req.params.rolls ? parseInt(req.params.rolls) : 1;

    // let side = parseInt(req.params.sides) || parseInt(req.query.sides) || 6;
    // let dice = parseInt(req.params.dice) || parseInt(req.query.dice) || 2;
    // let roll = parseInt(req.params.rolls) || parseInt(req.query.rolls) || 1;
	// res.status(200);
    res.send(Roll(side,dice,roll));
    res.end()
})


app.use((req, res, next) => {
	res.status(404).send("404 NOT FOUND");
    res.end()
})

app.listen(port, (err) => {
	console.log("Server port is " + port);
})