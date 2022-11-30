#!/usr/bin/env node

// import function created in other folder
import Roll from "../lib/Roll.js";
// import minimist to process argv
import minimist from "minimist";

// get CLI argv and process them
const args = minimist(process.argv.slice(2));

// print output
console.log(JSON.stringify(Roll(args.sides, args.dice, args.rolls)));
