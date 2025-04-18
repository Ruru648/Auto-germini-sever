const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const API_KEY = 'AIzaSyCJDY1EZS04_BNNftsKCPDjco2yyOVhifk';

app.post('/responder', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${API_KEY}`,
      {
        prompt: { text: prompt },
        temperature: 0.7,
        candidateCount: 1
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter resposta do Gemini.' });
  }
});

app.get('/', (req, res) => {
  res.send('Servidor do Gemini funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
