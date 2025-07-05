require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected');
});

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
