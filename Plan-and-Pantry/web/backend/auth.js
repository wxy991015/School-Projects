const bcrypt = require("bcryptjs");

module.exports = (app, client) => {
  const collection = client.db("plan-and-pantry").collection("users");

  app.post('/register', async (req, res) => {
    console.log(req.body)
    var email = req.body.email;
    var password = bcrypt.hashSync(req.body.password, 10);
    console.log(password);

    await client.connect();
    const checkAccount = await collection.findOne({ 'email': email })
    // if the account doesn't exist then we can register
    if (checkAccount === null) {
      const registerResult = await collection.insertOne({ "email": email, "password": password });
      if (!registerResult) {
        console.log("something went wrong");
        res.status(500).json('error: ' + err);
      }
      else {
        res.status(200).json('registered');
      }
      client.close();
    }
    // if the account does exist then don't register
    else {
      res.json('error: account already exists');
    }

  });

  app.post('/login', async (req, res) => {
    console.log(req.body)
    var email = req.body.email;
    var password = req.body.password;

    await client.connect();
    const checkAccount = await collection.findOne({ 'email': email })
    // if the account doesn't exist then we can't login
    if (!checkAccount || !bcrypt.compareSync(password, checkAccount.password)) {
      res.json('error: authenication failed');
    }
    // if the account does exist then try to login
    else {
      res.status(200).json('logging in');
    }
    client.close();
  });
}
