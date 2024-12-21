const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// App setup
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/eventDashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/events', require('./routes/events'));
app.use('/api/attendees', require('./routes/attendees'));
app.use('/api/tasks', require('./routes/tasks'));

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
