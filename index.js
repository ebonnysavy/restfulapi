const PORT = 5000;
const express = require('express');
const fs = require('fs');
const app = express();

app.get('/users', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Failed to get data from file');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.get('/users/:id', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Failed to get data from file');
    } else {
      const users = JSON.parse(data);
      const userinfo = users["user"+req.params.id];
      if (userinfo) {
        res.send(userinfo);
      } else {
        res.status(404).send('User cannot found');
      }
    }
  });
});

app.get('/users/profession/:profession', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Failed to get data from file');
    } else {
      const users = JSON.parse(data);
      const specificUsers = Object.values(users).filter(user => user.profession === req.params.profession);
      if (specificUsers.length === 0) {
        res.status(404).send('No users could be found with that profession');
      } else {
        res.send(specificUsers);
      }
    }
  });
});

app.get('/users/name/:name', (req, res) => {
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Failed to get data from file');
    } else {
      const users = JSON.parse(data);
      const name = req.params.name
      const specificName = Object.values(users).find(user => user.name === name);
      if (specificName.length===0) {
        res.status(404).send('User cannot found');
      } else {
        res.send(specificName);
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});