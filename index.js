const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
const apiRoutes = require('./apis');
app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
