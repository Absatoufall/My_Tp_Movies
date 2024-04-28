const db = require("../models");
const Movie = db.movies;

// Ccreation et sauvegarde
exports.create = (req, res) => {
    // Validation de la requête
    if (!req.body.title) {
        res.status(400).send({ message: "Le titre ne peut pas être vide!" });
        return;
    }

    // creation film 
    const movie = new Movie({
        title: req.body.title,
        synopsis: req.body.synopsis,
        dateDeSortie: req.body.dateDeSortie,
        director: req.body.director,
        genre: req.body.genre,
        actors: req.body.actors,
    });

    // Enregistrement du film dans la BDD
    movie
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la création du film.",
            });
        });
};

// Recuperation des films de la base de données
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ?
        { title: { $regex: new RegExp(title), $options: "i" } } :
        {};
    Movie.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération des films.",
            });
        });
};

// Suppression d'un film avec son ID 
exports.delete = (req, res) => {
    const id = req.params.id;
    Movie.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Impossible de supprimer le film avec l'ID=${id}. Peut-être que le film n'a pas été trouvé!`,
                });
            } else {
                res.send({
                    message: "Le film a été supprimé avec succès!",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Impossible de supprimer le film avec l'ID=" + id,
            });
        });
};

// Suppression de tous les films figurant dans la BDD
exports.deleteAll = (req, res) => {
    Movie.deleteMany({})
        .then((data) => {
            res.send({
                message: `${data.deletedCount} films ont été supprimés avec succès!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la suppression de tous les films.",
            });
        });
};

// Mettre à jour un film par son ID
exports.update = (req, res) => {
    const id = req.params.id;

    if (!req.body) {
        return res.status(400).send({
            message: "Les données à mettre à jour ne peuvent pas être vides!"
        });
    }

    Movie.findByIdAndUpdate(id, req.body, { new: true })
        .then(movie => {
            if (!movie) {
                return res.status(404).send({
                    message: `Film non trouvé avec l'ID ${id}.`
                });
            }
            res.send(movie);
        })
        .catch(err => {
            res.status(500).send({
                message: `Erreur lors de la mise à jour du film avec l'ID ${id}.`
            });
        });
};