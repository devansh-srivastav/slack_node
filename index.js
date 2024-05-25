const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to receive Slack events and verify URL
app.post('/slack/events', (req, res) => {
    // Handle incoming event payload here
    const payload = req.body;
    // Process the event payload
    console.log(payload);
    res.json({ status: 'success' });
});

// Endpoint to handle Slack challenge during verification
app.get('/slack/events', (req, res) => {
    // Respond to URL verification challenge
    const challenge = req.query.challenge;
    res.send(challenge);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
