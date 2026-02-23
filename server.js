const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files (your index.html, css, js)
app.use(express.static(__dirname));

// The Proxy Route - This fixes the CORS issue
app.get('/api/ics', async (req, res) => {
    const url = req.query.url;
    
    if (!url) {
        return res.status(400).send('Missing URL parameter');
    }

    try {
        const response = await fetch(url);
        const data = await response.text();
        res.send(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).send('Error fetching ICS data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});