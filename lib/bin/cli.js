#!/usr/bin/env node

// import function created in other folder
import roll from "../lib/roll.js";
// import minimist to process argv
import minimist from "minimist";

// get CLI argv and process them
const args = minimist(process.argv.slice(2));

// // default value of sides is 6: regular dice
// const sides = args.sides ? args.sides: 6;
// // default value of dice is 2
// const dice = args.dice ? args.dice: 2;
// // default value of rolls is 1
// const rolls = args.rolls ? args.rolls: 1;

// print output
console.log(JSON.stringify(roll(args.sides, args.dice, args.rolls)));
