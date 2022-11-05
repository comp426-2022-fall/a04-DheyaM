#!/usr/bin/env node

import {roll} from "./lib/roll.js";
import express from "express";
import minimist from "minimist";

const app = express()
const args = minimist(process.argv.slice(2));
const port = args.port ? args.port: 5000;

app.get('/app', (req, res, next) => {
	res.send("200 OK").end()
})

app.get('/app/roll', (req, res, next) => {
	res.status(200);
    res.send(roll(6, 2, 1)).end();
})

app.get('/app/roll', (req, res, next) => {
    let side = parseInt(req.params.sides) || parseInt(req.query.sides);
    let dice = parseInt(req.params.dice) || parseInt(req.query.dice);
    let roll = parseInt(req.params.rolls) || parseInt(req.query.rolls);
	res.status(200);
    res.send(roll(side,dice,roll)).end();
})

app.get('/app/roll/:sides', (req, res, next) => {
	res.status(200)
    res.send(roll(parseInt(req.params.sides), 2, 1)).end();
})

app.get('/app/roll/:sides/:dice', (req, res, next) => {
	res.status(200);
    res.send(roll(parseInt(req.params.sides), parseInt(req.params.dice), 1)).end();
})

app.use('/app/roll/:sides/:dice/:rolls', (req, res, next) => {
	res.status(200);
    res.send(roll(parseInt(req.params.sides), parseInt(req.params.dice), parseInt(req.params.rolls))).end();
})

app.use((req, res) => {
	res.status(404).send("404 NOT FOUND").end();
})

app.listen(port, (err) => {
	console.log("Server port is " + port);
})