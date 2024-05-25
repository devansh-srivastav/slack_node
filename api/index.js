const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to receive Slack events and verify URL
app.post('/slack/events', async(req, res) => {
    const payload = req.body;
    if (payload.type === 'url_verification') {
        // Respond to URL verification challenge
        const challenge = payload.challenge;
        res.send(challenge);
    } 
    if (payload.type === 'event_callback' && payload.event.type === 'message' && payload.event.channel_type === 'im') {
        // Extract relevant data from the event payload
        const { channel, user, text, ts } = payload.event;

        try {
            // Add event data to the database
            const record = await xata.db.data_test.create({
                channel: channel,
                user: user,
                text: text,
            });

            // Log success message
            console.log('Event data added to the database:', record);

            // Respond with a success message
            res.json({ status: 'success' });
        } catch (error) {
            // Log error message
            console.error('Error adding event data to the database:', error);

            // Respond with an error message
            res.status(500).json({ error: 'Internal server error' });
        }
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
