const express = require('express');

const routes = function(Planet) {

  const planetRouter = express.Router();

  planetRouter.use('/Planets/:planetId', function(req,res,next){
    Planet.findById(req.params.planetId, function(error,planet){
      if(error){
        res.status(500).send(error);
      } else if(planet) {
        req.planet = planet;
        next();
      } else {
        res.status(404).send('no planet found');
      }
    });
  });
  planetRouter.route('/Planets')
    .post(function(req,res){
      const planet = new Planet(req.body);
      planet.save();
      res.status(201).send(planet);

    })
    .get(function(req,res){
      const query = req.query;
      Planet.find(query, function(error, planets){
        if(error){
          res.status(500).send(error);
        } else {
          res.json(planets);
        }
      });
      });

  planetRouter.route('/Planets/:planetId')
    .get(function(req, res){
      res.json(req.planet);
    })
    .put(function(req,res){
      req.planet.id = req.body.id;
      req.planet.name = req.body.name;
      req.planet.save(function(err){
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.planet);
        }
      });
      res.json(req.planet);
    })
    .patch(function(req,res){
      if(req.body._id) {
        delete req.body._id;
      }
      for(var p in req.body) {
        req.planet[p] = req.body[p];
      }
      req.planet.save(function(err){
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.planet);
        }
      });
  });

return planetRouter;


}

module.exports = routes;
