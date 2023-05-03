const express = require("express");
const app = express();
const config = require("./config/config");
const User = require("./models/user");
const cors = require("cors");
const bcrybt = require("bcrypt");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Test DB connection
config
  .authenticate()
  .then(() => {
    console.log("Database is connected!");
  })
  .catch((err) => console.log(err));

// Register route
app.post("/register", function (req, res) {
  let plaintextPassword = req.body.password;
  let salt = 10;

  // Convert the Plain Text Password to a Hashed Password
  bcrybt.hash(plaintextPassword, salt, function (err, hashedPassword) {
    let user_data = req.body;
    user_data.password = hashedPassword; // Replace plain text password with hashed password

    // Create user in DB
    User.create(user_data)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
});

// Login route
app.post("/login", function (req, res) {
  let emailAddress = req.body.email;
  let plainTextPassword = req.body.password;

  // Find a user based on their email address
  let data = {
    where: { email: emailAddress },
  };

  User.findOne(data)
    .then((result) => {
      // Check if user was found in DB
      if (result) {
        // Compare plain text password to the has value stored in the DB
        bcrybt.compare(
          plainTextPassword,
          result.password,
          function (err, output) {
            if (output) {
              res.status(200).send(result);
            } else {
              res.status(400).send("Incorrect password");
            }
          },
        );
      } else {
        res.status(404).send("User does not exist");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Server
const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server is running on Port ${PORT}`);
});
