const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./api/authRoutes');
const userRoutes = require('./api/userRoutes');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 22;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
