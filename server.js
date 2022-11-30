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
    res.send(Roll(6, 2, 1));
    res.end()
})

app.get('/app/roll/:sides', (req, res, next) => {
    res.send(Roll(parseInt(req.body.sides), 2, 1));
    res.end()
})

app.get('/app/roll/:sides/:dice', (req, res, next) => {
    res.send(Roll(parseInt(req.body.sides), parseInt(req.body.dice), 1));
    res.end()
})

app.post('/app/roll/:sides/:dice/:rolls', (req, res, next) => {
    res.send(Roll(parseInt(req.body.sides), parseInt(req.body.dice), parseInt(req.body.rolls)));
    res.end()
})


app.get('/app/roll', (req, res, next) => {
    var side = req.body.sides ? parseInt(req.body.sides) : 6;
    var dice = req.body.dice ? parseInt(req.body.dice) : 2;
    var roll = req.body.rolls ? parseInt(req.body.rolls) : 1;
    res.send(Roll(side,dice,roll));
    res.end()
})


app.get((req, res, next) => {
	res.status(404).send("404 NOT FOUND");
    res.end()
})

app.listen(port, (err) => {
	console.log("Server port is " + port);
})