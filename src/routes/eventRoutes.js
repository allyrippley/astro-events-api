const express = require('express');

const routes = function(Event) {

  const eventRouter = express.Router();

  eventRouter.use('/Events/:eventId', function(req,res,next){
    Event.findById(req.params.eventId, function(error,event){
      if(error){
        res.status(500).send(error);
      } else if(event) {
        req.event = event;
        next();
      } else {
        res.status(404).send('no event found');
      }
    });
  });
  eventRouter.route('/Events')
    .post(function(req,res){
      const event = new Event(req.body);
      event.save();
      res.status(201).send(event);

    })
    .get(function(req,res){
      const query = req.query;
      Event.find(query, function(error, events){
        if(error){
          res.status(500).send(error);
        } else {
          res.json(events);
        }
      });
      });

  eventRouter.route('/Events/:eventId')
    .get(function(req, res){
      res.json(req.event);
    })
    .put(function(req,res){
      req.event.id = req.body.id;
      req.event.date = req.body.date;
      req.event.planet = req.body.planet;
      req.event.type = req.body.type;
      req.event.sign = req.body.sign;
      req.event.degree = req.body.degree ? req.body.degree : "00:00";
      req.event.save(function(err){
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.event);
        }
      });
      res.json(req.event);
    })
    .patch(function(req,res){
      if(req.body._id) {
        delete req.body._id;
      }
      for(var p in req.body) {
        req.event[p] = req.body[p];
      }
      req.event.save(function(err){
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.event);
        }
      });
  });

return eventRouter;


}

module.exports = routes;
