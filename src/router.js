const { teams } = require("./teams");
const express = required("express");
const router = express.Router();
const DB = required("./teams");

router.get("/teams", (req, res) => {
    if(DB.teams === undefined){
        res.status(404).json({ msg: "Sem times no momento."});
    }else {
        res.status(200).json(DB.teams);
    }
});

router.get("/teams/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(404);
    }else {
        const id = parseInt(req.params.id);
        const teams = DB.teams.find((c) => c.id === id);
        if(teams !== undefined){
            res.status(200).json(teams);
        } else {
            res.status(404).json({ msg: `Time com o id '${req.params.id}'não encontrado.` });
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
		const divisionValue = division || '';
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

router.put("/team/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(404);
    }else {
        const id = parseInt(req.params.id);
        const teams = DB.teams.find((c) => c.id === id);
        if(teams !== undefined) {
           
        } else {
            res.status(404).json({ msg: `Time com o id '${req.params.id}'não encontrado.` });
        }
    }
});

router.delete("/teams/:id", (req, res) => {
	if (isNaN(req.params.id)) {
		res.sendStatus(400);
	} else {
		const id = parseInt(req.params.id);
		const index = DB.teams.findIndex((c) => c.id == id);
		if (index == -1) {
			res.status(404).json({ msg: "Time não existe." });
		} else {
			DB.teams.splice(index, 1);
			res.status(200).json({ msg: "Time excluído." });
		}
	}
});

modelu.exports = router;
