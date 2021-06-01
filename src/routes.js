const express = require("express");
const routes = express.Router();
const DB = require("./teams");

routes.get("/characters", (req, res) => {
	res.status(200).json(DB.characters);
});

routes.get("/characters/:id", (req, res) => {
	if (isNaN(req.params.id)) {
		//id não é número, bad request
		res.sendStatus(400);
	} else {
		const id = parseInt(req.params.id);
		const character = DB.characters.find((c) => c.id == id);
		if (character != undefined) {
			res.status(200).json(character);
		} else {
			res.status(404).json({ msg: "Personagem não existe." });
		}
	}
});

routes.post("/newTeam", (req, res) => {
	const {
		name,
		city,
		state,
		division,
		titles,
		payroll
	} = req.body;
	if (name && city && state && titles && payroll) {
		const id = DB.teams.length + 1;
		const divisionValue = division ?? '';
		DB.teams.push({
			id,
			name,
			city,
			state,
			divisionValue,
			titles,
			payroll
		});
		res.status(200).json({ msg: "Time adicionado." });
	} else {
		res.status(400).json({ msg: "Dados obrigatórios incompletos." });
	}
});

routes.delete("/team/:id", (req, res) => {
	if (isNaN(req.params.id)) {
		res.sendStatus(400);
	} else {
		const id = parseInt(req.params.id);
		const index = DB.teams.findIndex((c) => c.id == id);
		if (index == -1) {
			res.status(404).json({ msg: "Time não existe." });
		} else {
			DB.characters.splice(index, 1);
			res.status(200).json({ msg: "Time excluído." });
		}
	}
});

routes.put("/character/:id", (req, res) => {
	if (isNaN(req.params.id)) {
		res.sendStatus(400);
	} else {
		const id = parseInt(req.params.id);
		const character = DB.characters.find((c) => c.id == id);
		if (character != undefined) {
			const {
				name,
				species,
				house,
				ancestry,
				wand, //wand: { core, length },
				hogwartsStudent,
				hogwartsStaff,
			} = req.body;

			if (name != undefined) character.name = name;
			if (species != undefined) character.species = species;
			if (house != undefined) character.house = house;
			if (ancestry != undefined) character.ancestry = ancestry;
			if (wand.core != undefined) character.wand.core = wand.core;
			if (wand.length != undefined) character.wand.length = wand.length;
			if (hogwartsStudent != undefined)
				character.hogwartsStudent = hogwartsStudent;
			if (hogwartsStaff != undefined) character.hogwartsStaff = hogwartsStaff;
			res.status(200).json(character);
		} else {
			res.status(404).json({ msg: "Personagem não existe." });
		}
	}
});

module.exports = routes;
