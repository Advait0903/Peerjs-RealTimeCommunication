const express = require('express');
const { ExpressPeerServer } = require('peer');
const path = require('path');

const app = express();
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Set up Peer.js server
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

// Store the inputted data
let inputData = [];

// Serve static files
app.use(express.static('public'));

app.get('/peerjs/peer.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'node_modules', 'peer', 'dist', 'peerjs.js'));
  });
  
// Mount Peer.js server at /peerjs
app.use('/peerjs', peerServer);

// Serve the first page with input fields
app.get('/zigy1', (req, res) => {
  res.sendFile(__dirname + '/public/zigy1.html');
});

// Serve the second page that displays the real-time data
app.get('/zigy2', (req, res) => {
  res.sendFile(__dirname + '/public/zigy2.html');
});

// API endpoint to receive and store the inputted data
app.post('/api/input', express.json(), (req, res) => {
  const { text } = req.body;
  inputData.push(text);

  res.sendStatus(200);
});

// API endpoint to retrieve the stored data
app.get('/api/data', (req, res) => {
  res.json(inputData);
});
