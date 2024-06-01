const SETTINGS = require('./secrets.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Pet = require('./models/Pet');
const DogWalker = require('./models/DogWalker');
const Client = require('./models/Client');

const app = express();

// Connect to MongoDB
mongoose.connect(SETTINGS.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Pet CRUD operations
app.get('/pets', async (req, res) => {
  const pets = await Pet.find();
  res.render('pets', { pets });
});

app.get('/pets/add-uno', (req, res) => {
  res.render('add-pet');
});

app.post('/pets/add-dos', async (req, res) => {
  const pet = new Pet(req.body);
  await pet.save();
  res.redirect('/pets');
});

app.get('/pets/update/:id', async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  res.render('update-pet', { pet });
});

app.post('/pets/update/:id', async (req, res) => {
  await Pet.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/pets');
});

app.post('/pets/delete/:id', async (req, res) => {
  await Pet.findByIdAndDelete(req.params.id);
  res.redirect('/pets');
});

// Client CRUD operations
app.get('/clients', async (req, res) => {
  const clients = await Client.find();
  res.render('clients', { clients });
});

app.get('/clients/add', (req, res) => {
  res.render('add-client');
});

app.post('/clients/add', async (req, res) => {
  const client = new Client(req.body);
  await client.save();
  res.redirect('/clients');
});

app.get('/clients/update/:id', async (req, res) => {
  const client = await Client.findById(req.params.id);
  res.render('update-client', { client });
});

app.post('/clients/update/:id', async (req, res) => {
  await Client.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/clients');
});

app.post('/clients/delete/:id', async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.redirect('/clients');
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
