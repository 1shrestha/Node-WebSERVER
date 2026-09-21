// routes.js
// Handles routing logic: maps incoming request URLs to the correct
// HTML file, serves static CSS, sets HTTP status codes, and serves
// a custom 404 page for unmatched routes.
// Uses the asynchronous (non-blocking) version of the File System module.

const fs = require('fs');
const path = require('path');

// Map each route to the HTML file that should be served for it.
// Adding a new route later is as simple as adding one more entry here.
const routes = {
  '/': 'home.html',        // root path also shows the home page
  '/home': 'home.html',
  '/about': 'about.html',
  '/contact': 'contact.html',
  '/services': 'services.html' // extra/bonus route with meaningful content
};

const PAGES_DIR = path.join(__dirname, 'pages');
const PUBLIC_DIR = path.join(__dirname, 'public');

function handleRequest(req, res) {
  // Only handle GET requests for this simple server
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('405 Method Not Allowed');
    return;
  }

  const url = req.url.split('?')[0]; // ignore any query string

  // 1. Serve the CSS file as a static asset
  if (url === '/style.css') {
    serveStaticFile(res, path.join(PUBLIC_DIR, 'style.css'), 'text/css');
    return;
  }

  // 2. Check if the requested URL matches one of our defined routes
  if (routes[url]) {
    const filePath = path.join(PAGES_DIR, routes[url]);
    serveStaticFile(res, filePath, 'text/html');
    return;
  }

  // 3. No route matched -> serve the custom 404 page
  serve404(res);
}

// Reads a file asynchronously and sends it as the response.
// Uses fs.readFile (non-blocking / async) rather than readFileSync.
function serveStaticFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading file:', filePath, err.message);
      // If the file itself is missing on disk, fall back to a 500 error
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

// Serves the custom 404 page with a proper 404 status code.
function serve404(res) {
  const notFoundPath = path.join(PAGES_DIR, '404.html');

  fs.readFile(notFoundPath, (err, data) => {
    if (err) {
      // Fallback in case even the 404 page is missing
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

module.exports = { handleRequest };
