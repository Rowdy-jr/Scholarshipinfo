const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('.'));

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint for pinging
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Scholarship Hub'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Scholarship Hub server running on port ${PORT}`);
});

// Auto-ping to keep alive (optional)
setInterval(() => {
    fetch(`https://${process.env.RENDER_EXTERNAL_URL || 'your-app.onrender.com'}/health`)
        .then(() => console.log('Self-ping successful'))
        .catch(err => console.log('Self-ping failed:', err.message));
}, 5 * 60 * 1000); // Every 5 minutes
