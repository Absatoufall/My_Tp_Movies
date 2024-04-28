module.exports = app => {
    const movies = require("../controllers/movie.controller.js"); 
    let router = require("express").Router();

    // creer un nouveau film
    router.post("/", movies.create);

    // Retourner tous les films
    router.get("/", movies.findAll);

    // Supprimer un film avec  un id
    router.delete("/:id", movies.delete);

    // Supprimer tous les films
    router.delete("/", movies.deleteAll);

    // Mettre à jour un film par son id 
    router.put("/:id", movies.update);

    app.use("/api/movies", router);
};
