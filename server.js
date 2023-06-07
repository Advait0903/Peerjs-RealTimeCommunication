const express = require('express');
const { ExpressPeerServer } = require('peer');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = express();
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Set up Peer.js server
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

require('./swagger')(app);
// const options = {
//   definition: {
//     openapi : '3.0.0',
//     info : {
//       title: 'NodeJS API for RTC',
//       version : '1.2.0'
//     },

//     servers : {
//       api :'http://localhost:3000/'
//     }
//   },
//   apis :['./server.js']
// }

// const swaggerSpec = swaggerJSDoc(options)
// module.exports = (app) => {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// }

// Store the inputted data
let inputData = [];

// Serve static files
app.use(express.static('public'));

/**
 * @swagger
 * /peerjs/peer.js/: 
 *  get:
 *    summary: This API is used to check if PeerJS is working or not.
 *    description: This API is used to check if PeerJS is working or not.
 *    responses: 
 *        200:
 *            description: To test connection .
 */
app.get('/peerjs/peer.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'node_modules', 'peer', 'dist', 'peerjs.js'));
  });
  
// Mount Peer.js server at /peerjs
app.use('/peerjs', peerServer);

/**
 * @swagger
 * /zigy1: 
 *  get:
 *    summary: This API is used to land on user input page.
 *    description: This API is used to land on user input page.
 *    responses: 
 *        200:
 *            description: To test connection .
 */
// Serve the first page with input fields
app.get('/api/zigy1', (req, res) => {
  res.sendFile(__dirname + '/public/zigy1.html');
});

// Serve the second page that displays the real-time data

/**
 * @swagger
 * /zigy2: 
 *  get:
 *    summary: This API is used to land on display page.
 *    description: This API is used to land on display page.
 *    responses: 
 *        200:
 *            description: To test connection .
 */
app.get('/api/zigy2', (req, res) => {
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
