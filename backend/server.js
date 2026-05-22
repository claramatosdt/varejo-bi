const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let vendas = [];
let id = 1;

// rota raiz
app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

// CREATE
app.post('/vendas', (req, res) => {
  const dados = req.body;

  if (!Array.isArray(dados)) {
    return res.status(400).json({ erro: 'Formato inválido' });
  }

  dados.forEach(v => {
    if (!v.produto || isNaN(v.valor)) return;

    v.id = id++;
    vendas.push(v);
  });

  res.json(vendas);
});

// READ
app.get('/vendas', (req, res) => {
  res.json(vendas);
});

// UPDATE
app.put('/vendas/:id', (req, res) => {
  const index = vendas.findIndex(v => v.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Não encontrado' });
  }

  vendas[index] = { ...vendas[index], ...req.body };
  res.json(vendas[index]);
});

// DELETE
app.delete('/vendas/:id', (req, res) => {
  vendas = vendas.filter(v => v.id != req.params.id);
  res.json({ sucesso: true });
});

app.listen(3000, () => console.log('🚀 API na porta 3000'));