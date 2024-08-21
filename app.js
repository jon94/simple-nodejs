const tracer = require('dd-trace').init();  // Add this line to import and initialize the tracer
const express = require("express");
const app = express();
const port = 3000;

// Add the tracer hook to track requests for the /user/:id route
tracer.use('express', {
  hooks: {
    request: (span, req, res) => {
      if (req.route && req.route.path === '/user/:id') {
        span.setTag('http.route', '/user/:id');
      }
    }
  }
});

// Define a GET endpoint at /api
app.get("/api", (req, res) => {
  const apiResponse = {
    message: "Hello, this is a simple API!",
    date: new Date(),
  };
  res.json(apiResponse);
});

// Define a GET endpoint at /getErrorRequest to simulate an application error
app.get("/getErrorRequest", (req, res) => {
  throw new Error("This is a simulated application error");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.param("id", function (req, res, next, id) {
  console.log("CALLED ONLY ONCE");
  next();
});

app.get("/user/:id", function (req, res, next) {
  console.log("although this matches");
  next();
});

app.get("/user/:id", function (req, res) {
  console.log("and this matches too");
  res.end();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
