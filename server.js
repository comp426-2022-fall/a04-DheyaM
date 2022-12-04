#!/usr/bin/env node

import Roll from "./lib/lib/roll.js";
import express from "express";
import minimist from "minimist";

const app = express()
const args = minimist(process.argv.slice(2));
const port = args.port ? args.port: 5000;

// get information from HTTP body as url encoded
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/app', (req, res) => {
    res.send("200 OK");
})

// default endpoint
app.get('/app/roll', (req, res) => {
    res.send(Roll(6, 2, 1));
})

app.get('/app/roll/:sides', (req, res) => {
    res.send(Roll(parseInt(req.params.sides), 2, 1));
})

app.get('/app/roll/:sides/:dice', (req, res) => {
    res.send(Roll(parseInt(req.params.sides), parseInt(req.params.dice), 1));
})

app.get('/app/roll/:sides/:dice/:rolls', (req, res) => {
    res.send(Roll(parseInt(req.params.sides), parseInt(req.params.dice), parseInt(req.params.rolls)));
})

app.use((req, res) => {
   res.status(404).send("404 NOT FOUND");
})

app.listen(port, (err) => {
    console.log("Server port is " + port);
 })
