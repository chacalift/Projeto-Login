const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const users = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (user && user.password === password) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/');
  }
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    res.redirect('/register');
  } else {
    users.push({ username, password });
    res.redirect('/');
  }
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
