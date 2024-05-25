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
    } 
    if (payload.type === 'event_callback' && payload.event.type === 'message' && payload.event.channel_type === 'im') {
        // Extract relevant data from the event payload
        const { channel, user, text, ts } = payload.event;

        // Process the event data as needed
        console.log(`New message in direct message channel ${channel} from user ${user}: ${text}`);

        // Respond with a success message
        res.json({ status: 'success' });
    }
    else {
        // Handle other Slack events here
        console.log('Received Slack event:', payload);
        res.json({ status: 'success' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
