const SETTINGS = require('./secrets');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Pet = require('./models/Pet');
const DogWalker = require('./models/DogWalker');
const Client = require('./models/Client');
const Appointment = require('./models/Appointment');

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
// Routes
app.get('/', (req, res) => {
  const dogImages = [
    '/images/dog1.jpg',
    '/images/dog2.jpg',
    '/images/dog3.jpg',
    '/images/dog4.jpg',
    '/images/dog5.jpg',
    '/images/dog6.jpg',
    '/images/dog7.jpg',
    '/images/dog8.jpg',
    '/images/dog9.jpg'
  ];
  res.render('index', { dogImages });
});

// Pet CRUD operations
app.get('/pets', async (req, res) => {
  const pets = await Pet.find();
  res.render('pets', { pets });
});

app.get('/pets/add', async (req, res) => {
  const clients = await Client.find();
  res.render('add-pet', { clients });
});

app.post('/pets/add', async (req, res) => {
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

// Dog Walker CRUD operations

app.get('/dogwalkers', async (req, res) => {
  const dogWalkers = await DogWalker.find();
  res.render('dogwalkers', { dogWalkers });
});

app.get('/dogwalkers/add', (req, res) => {
  res.render('add-dogwalker');
});

app.post('/dogwalkers/add', async (req, res) => {
  const dogWalker = new DogWalker(req.body);
  await dogWalker.save();
  res.redirect('/dogwalkers');
});

app.get('/dogwalkers/update/:id', async (req, res) => {
  const dogWalker = await DogWalker.findById(req.params.id);
  res.render('update-dogwalker', { dogWalker });
});

app.post('/dogwalkers/update/:id', async (req, res) => {
  await DogWalker.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/dogwalkers');
});

app.post('/dogwalkers/delete/:id', async (req, res) => {
  await DogWalker.findByIdAndDelete(req.params.id);
  res.redirect('/dogwalkers');
});

// Appointment CRUD operations
app.get('/appointments', async (req, res) => {
  const appointments = await Appointment.find().populate('petID walkerID');
  res.render('appointments', { appointments });
});

app.get('/appointments/add', async (req, res) => {
  const pets = await Pet.find();
  const dogWalkers = await DogWalker.find();
  res.render('add-appointment', { pets, dogWalkers });
});

app.post('/appointments/add', async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();
  res.redirect('/appointments');
});

app.get('/appointments/update/:id', async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  const pets = await Pet.find();
  const dogWalkers = await DogWalker.find();
  res.render('update-appointment', { appointment, pets, dogWalkers });
});

app.post('/appointments/update/:id', async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/appointments');
});

app.post('/appointments/delete/:id', async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.redirect('/appointments');
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
