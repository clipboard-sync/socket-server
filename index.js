const Socket = require("./socket")

const port = process.env.PORT || 3000;

new Socket(port)
