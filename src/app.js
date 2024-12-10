const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
