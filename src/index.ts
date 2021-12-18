import express, { Response } from 'express';
import path from 'path';

const server = express();
const port = 8000;

// return the compiled client js file
server.get("/client.js", (_, res: Response) => {
	res.sendFile(path.join(__dirname, "../dist/client.js"));
});

// return two.js library
server.get("/two.js", (_, res: Response) => {
	res.sendFile(path.join(__dirname, "../node_modules/two.js/build/two.min.js"));
});

// root path will send the html file
server.get("/", (_, res: Response) => {
	res.sendFile(path.join(__dirname, "./client/index.html"));
});

server.listen(port, () => {
	console.log(`Listening @ http://localhost:${port}`);
});
