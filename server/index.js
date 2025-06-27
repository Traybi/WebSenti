const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bouquetsPath = path.join(__dirname, 'data', 'bouquets.json');

app.use(express.json());

// Serve bouquets data
app.get('/api/bouquets', (req, res) => {
  const data = JSON.parse(fs.readFileSync(bouquetsPath));
  res.json(data);
});

// Get bouquet by sentiment
app.get('/api/bouquets/:sentiment', (req, res) => {
  const sentiment = req.params.sentiment.toLowerCase();
  const data = JSON.parse(fs.readFileSync(bouquetsPath));
  const bouquet = data.find(b => b.sentiment === sentiment);
  if (!bouquet) {
    return res.status(404).json({ message: 'Sentimiento no encontrado' });
  }
  res.json(bouquet);
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
