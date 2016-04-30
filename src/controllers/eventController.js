const eventController = function(Event) {

  const post = function(req,res){
    const event = new Event(req.body);
    event.save();
    res.status(201).send(event);

  }
  const get = function(req,res){
    const query = req.query;
    Event.find(query, function(error, events){
      if(error){
        res.status(500).send(error);
      } else {
        res.json(events);
      }
    });
    }

    return {
      post: post,
      get: get
    }
}

module.exports = eventController;
