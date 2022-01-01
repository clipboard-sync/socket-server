#!/usr/bin/env node
const Socket = require("clipboard-socket")

const args = process.argv;
const port = parseInt(args.pop()) || 3000;

new Socket(port)
