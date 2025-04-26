// backend/server.js
const express = require('express');
const cors = require('cors');
const getAlert = require('./getAlert');

const app = express();
const PORT = 4000;

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

app.post('/api/alert', async (req, res) => {
  try {
    const payload = req.body;

    console.log('Payload recebido:', JSON.stringify(payload, null, 2));

    if (payload && payload.event && payload.event.broadcaster_user_name) {
      console.log(`Evento para o streamer: ${payload.event.broadcaster_user_name}`);
    }

    const result = await getAlert(payload); 

    res.json({ status: 'Recebido com sucesso', data: result });
  } catch (err) {
    console.error('Erro ao processar o evento:', err.message);
    res.status(500).json({ error: 'Erro ao processar o evento' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});