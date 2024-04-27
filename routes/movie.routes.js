module.exports = app => {
    const movies = require("../controllers/movie.controller.js"); // Modifié de student.controller.js à movie.controller.js
    let router = require("express").Router();
  
    // Create a new Movie
    router.post("/", movies.create); 
  
    // Retrieve all Movies
    router.get("/", movies.findAll); 
  
    // Delete a Movie with id
    router.delete("/:id", movies.delete); 
    
    // Delete all movies
    router.delete("/", movies.deleteAll); 

    // Mettre à jour un film par ID
    router.put("/:id", movies.update);
  
    app.use("/api/movies", router); 
  };
  