#!/usr/bin/env node

import Roll from "./lib/lib/roll.js";
import express from "express";
import minimist from "minimist";

const app = express()
// app.use(express.urlencoded({extended: true}));
const args = minimist(process.argv.slice(2));
const port = args.port ? args.port: 5000;

// let port = 5000;

// if (args.port){
//     port = args.port;
// }
// const port = args.port || 5000;

// get information from HTTP body as url encoded


app.get('/app', (req, res) => {
    res.status(200).send("200 OK");
})

// default endpoint
app.get('/app/roll', (req, res, next) => {
    res.status(200).send(Roll(6, 2, 1));
})

app.get('/app/roll/:sides', (req, res, next) => {
    res.status(200).send(Roll(parseInt(req.params.sides), 2, 1));
})

app.get('/app/roll/:sides/:dice', (req, res, next) => {
    res.status(200).send(Roll(parseInt(req.params.sides), parseInt(req.params.dice), 1));
})

app.use('/app/roll/:sides/:dice/:rolls', (req, res, next) => {
    res.status(200).send(Roll(parseInt(req.params.sides), parseInt(req.params.dice), parseInt(req.params.rolls)));
})

app.use('/app/roll', (req, res, next) => {
    const side = req.params.sides ? parseInt(req.params.sides) : 6;
    const dice = req.params.dice ? parseInt(req.params.dice) : 2;
    const roll = req.params.rolls ? parseInt(req.params.rolls) : 1;
    res.send(Roll(side,dice,roll));
})

app.use((req, res, next) => {
    res.status(404).send("404 NOT FOUND");
 })

// app.listen(port);

// // start server
app.listen(port, (err) => {
    console.log('Server port is ' + port);
});

// app.listen(port, () => {
//     console.log('Server port is ' + port);
// })