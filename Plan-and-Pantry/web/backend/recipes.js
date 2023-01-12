var ObjectId = require('mongodb').ObjectId;

module.exports = (app, client) => {
  const collection = client.db("plan-and-pantry").collection("recipes");

  // get recipes from the db
  app.get('/recipes', async (req, res) => {
    console.log(req.body)
    console.log(req.query)

    await client.connect();
    collection.find(req.query).toArray(function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json('error: ' + err);
      }
      else {
        res.json(result);
      }
      client.close();
    });
  });

  // get a recipe by id
  app.get('/recipe/:id', async (req, res) => {
    console.log(req.params)

    await client.connect();
    collection.findOne({ '_id': ObjectId(req.params.id) }, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json('error: ' + err);
      }
      else if (result === null) {
        res.json('error: document doesn\'t exist');
      }
      else {
        res.json(result);
      }
      client.close();
    });
  });


  // add a new recipe to the db
  app.post('/recipes', async (req, res) => {
    console.log(req.body);

    await client.connect();
    collection.insertOne(req.body, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json('error: ' + err);
      }
      else {
        res.status(200).json('recipe added');
      }
      client.close();
    });
  });

  // can't add for a specific number, should error
  app.post('/recipe/:id', (req, res) => {
    res.json('error: cannot post to a specific recipe');
  });


  // bulk update all documents in the db
  app.put('/recipes', async (req, res) => {
    console.log(req.body);
    await client.connect();

    collection.updateMany({}, { $set: req.body }, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json('error: ' + err);
      }
      else {
        console.log("updated recipes");
        res.json(result);
      }
      client.close();
    });
  });

  // update a specific document in the db
  app.put('/recipe/:id', async (req, res) => {
    console.log(req.body);

    await client.connect();
    collection.updateOne({ '_id': ObjectId(req.params.id) }, { $set: req.body }, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json('error: ' + err);
      }
      else if (result.modifiedCount === 0) {
        res.json('error: recipe doesn\'t exist');
      }
      else {
        res.json(result);
      }
      client.close();
    });
  });


  // delete all documents from the db
  app.delete('/recipes', async (req, res) => {
    await client.connect();
    collection.deleteMany({}, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json('error: ' + err);
      }
      else {
        console.log("deleted all recipes");
        res.json(result);
      }
      client.close();
    });
  });

  // delete a specific document from the db
  app.delete('/recipe/:id', async (req, res) => {
    await client.connect();
    collection.deleteOne({ 'doc_num': doc_num }, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).json('error: ' + err);
      }
      else {
        console.log("deleted recipe");
        res.json(result);
      }
      client.close();
    });
  });
}