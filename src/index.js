const express = require("express");
const app = express();

const router = require("./router");
const port = 12345;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
	console.log("API rodando na porta " + port);
});
