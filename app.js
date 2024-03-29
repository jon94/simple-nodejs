const express = require('express');
const app = express();
const port = 3000;

// Define a GET endpoint at /api
app.get('/api', (req, res) => {
  const apiResponse = {
    message: 'Hello, this is a simple API!',
    date: new Date(),
  };

  // Send the JSON response
  res.json(apiResponse);
});

// Define a GET endpoint at /getErrorRequest to simulate an application error
app.get('/getErrorRequest', (req, res) => {
  // Simulate an error by throwing an exception
  throw new Error('This is a simulated application error');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
