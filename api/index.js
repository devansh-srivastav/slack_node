const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to receive Slack events and verify URL
app.post('/slack/events', (req, res) => {
    const payload = req.body;
    if (payload.type === 'url_verification') {
        // Respond to URL verification challenge
        const challenge = payload.challenge;
        res.send(challenge);
    } else {
        // Handle other Slack events here
        console.log('Received Slack event:', payload);
        res.json({ status: 'success' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
