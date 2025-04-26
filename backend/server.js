// backend/server.js
const express = require('express');
const cors = require('cors');
const getAlert = require('./getAlert');

const app = express();
const PORT = 4000;

let lastAlert = null; // stores last alert to get

// CORS config
const allowedOrigins = ['http://localhost:3000', 'http://192.168.127.4:8080'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));

app.use(express.json());

// post endpoint
app.post('/api/alert', async (req, res) => {
  try {
    const payload = req.body;

    console.log('Payload recebido no POST:', JSON.stringify(payload, null, 2));

    const result = await getAlert(payload);

    if (result) {
      lastAlert = result; // Salva o último alerta
      res.json({ status: 'Recebido com sucesso' });
    } else {
      res.status(400).json({ error: 'Payload inválido' });
    }
  } catch (err) {
    console.error('Erro ao processar o evento:', err.message);
    res.status(500).json({ error: 'Erro ao processar o evento' });
  }
});

// get endpoint
app.get('/api/alert', (req, res) => {
  if (lastAlert) {
    res.json({ data: lastAlert });
  } else {
    res.status(404).json({ error: 'Nenhum alerta disponível' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});