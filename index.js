const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const studentRoutes = require('./routes/api');
const userRoutes = require('./routes/userroute');
require('dotenv').config();
require('./helpers/init_mongodb');

const app = express();

// ✅ CORS config
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

// ✅ Custom headers (extra CORS support)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// ✅ Log every incoming request
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in one hour!'
});
app.use('/api', limiter);

// ✅ Mount routes
app.use('/api', studentRoutes);
app.use('/api', userRoutes);

// ❌ 404 Not Found Handler (with logging)
app.use((req, res, next) => {
  console.error(`❌ 404 Not Found: ${req.method} ${req.originalUrl}`);
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});




