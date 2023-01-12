const express = require('express');
const axios = require('axios')
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB info
const uri = "mongodb+srv://planpantry:b8uEF%24qe6t%23%21d2@cluster0.sydrq.mongodb.net/plan-and-pantry?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(express.static(path.join(__dirname, '../frontend/project/dist/project')));

// here we are configuring express
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 10000 }));

app.get('/', (req, res) => {
  res.send();
});

// User auth functions
require('./auth')(app, client);

// Recipe DB functions
require('./recipes')(app, client);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/project/dist/project/index.html"));
})

app.listen(port, () => {
  console.log(`Listening on *:${port}`);
});