const express = require('express');
const path = require('node:path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const db = require('./database/db');
const seedDatabase = require('./database/seed');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 3000;