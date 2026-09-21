# Node-WebSERVER
A simple Node.js web server built with the core http module — handles routing, serves styled HTML pages, and includes a custom 404 page. (No frameworks.)

# Simple Node.js Web Server

A basic web server built using Node.js's built-in `http` module (no Express, no frameworks).
It handles routing for multiple pages, serves static CSS, returns proper HTTP status codes,
and shows a custom 404 page for unknown routes.

## Features
- Routing for /home, /about, /contact, /services
- Custom styled 404 error page for invalid routes
- Asynchronous file reading (fs.readFile — non-blocking)
- Modular code: routing logic separated into routes.js
- Proper HTTP status codes (200, 404, 500)
- Shared CSS styling across all pages

## How to run
1. Clone this repo
2. Run `node server.js`
3. Visit http://localhost:3000/home in your browser

## Routes
| Route      | Description        |
|------------|---------------------|
| /home      | Home page           |
| /about     | About page          |
| /contact   | Contact page        |
| /services  | Bonus services page |
| any other  | Custom 404 page     |

## Tech Stack
- Node.js (core `http`, `fs`, `path` modules only)
