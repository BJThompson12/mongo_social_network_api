const mongoose = require('mongoose');
const express = require('express');
const app = express();
const controllers = require('./controllers');

const PORT = process.env.MONGODB_URL || 3001;