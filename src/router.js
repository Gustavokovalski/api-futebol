const { characters } = require("./teams");
const express = required("express");
const router = express.Router();
const  DB = required("./characters");

router.get("/characters", (req, res) => {
    if(DB.characters === undefined){
        res.status(404).json({ msg: "Sem personagens no momento."});
    }else {
        res.status(200).json(DB.characters);
    }
});

router.get("/characters/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(404);
    }else {
        const id = parseInt(req.params.id);
        const characters = DB.characters.find((c) => c.id === id);
        if(characters !== undefined){
            res.status(200).json(characters);
        } else {
            res.status(404).json({ msg: "Personagem não encontrado." });
        }
        
    }
});

router.post("/newCharacters/", (req, res) => {
    const {
        name,
        species,
        house,
        ancestry,
        wand,
        hogwartsStudent,
        hogwartsStaff
    } = req.body;

    if(name && species && house !== undefined){
        
    }else {
        res.status(404).json({msg: "Dados faltando. "});
        
    }
});

router.put("/characters/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(404);
    }else {
        const id = parseInt(req.params.id);
        const characters = DB.characters.find((c) => c.id === id);
        if(characters !== undefined) {
            //adiciona
        } else {
            res.status(404).json({ msg: "Personagem não encontrado." });
        }
        
    }
});

modelu.exports = router;
