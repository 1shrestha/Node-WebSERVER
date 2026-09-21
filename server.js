// server.js
// A simple Node.js web server built with the built-in "http" module.
// It serves different HTML pages based on the requested route,
// serves a CSS file, returns proper HTTP status codes, and shows
// a custom 404 page for unknown routes.

const http = require('http');
const path = require('path');

// Import our route handling logic from a separate module (modular code)
const { handleRequest } = require('./routes');

const PORT = 3000;

// Create the HTTP server.
// The callback runs every time a request comes in.
const server = http.createServer((req, res) => {
  // Delegate all routing/response logic to routes.js
  handleRequest(req, res);
});

// Start listening on the specified port
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
  console.log('Available routes: /home, /about, /contact, /style.css');
});
