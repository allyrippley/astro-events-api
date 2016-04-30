const planetController = function(Planet) {

  const post = function(req,res){
    const planet = new Planet(req.body);
    planet.save();
    res.status(201).send(planet);

  }
  const get = function(req,res){
    const query = req.query;
    Planet.find(query, function(error, planets){
      if(error){
        res.status(500).send(error);
      } else {
        res.json(planets);
      }
    });
    }

    return {
      post: post,
      get: get
    }
}

module.exports = planetController;
