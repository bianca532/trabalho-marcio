// controllers/TransacoesController.js
const Transacao = require('../models/transacoes');

// Função para criar uma nova transação
exports.createTransacao = async (req, res) => {
  const { codigo_transacao, data_hora, status_transacao, valor } = req.body;
  try {
    const newTransacao = await Transacao.create({
      codigo_transacao, data_hora, status_transacao, valor
    });
    res.status(201).json({ message: 'Transação criada com sucesso!', transacao: newTransacao });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para listar todas as transações
exports.getTransacoes = async (req, res) => {
  try {
    const transacoes = await Transacao.findAll();
    res.json(transacoes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para obter uma transação pelo ID
exports.getTransacaoById = async (req, res) => {
  const { id } = req.params;
  try {
    const transacao = await Transacao.findByPk(id);
    if (!transacao) return res.status(404).json({ error: 'Transação não encontrada' });
    res.json(transacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para atualizar uma transação
exports.updateTransacao = async (req, res) => {
  const { id } = req.params;
  const { codigo_transacao, data_hora, status_transacao, valor } = req.body;
  try {
    const [updated] = await Transacao.update(
      { codigo_transacao, data_hora, status_transacao, valor },
      { where: { id } }
    );
    if (updated) {
      const updatedTransacao = await Transacao.findByPk(id);
      res.json({ message: 'Transação atualizada com sucesso!', transacao: updatedTransacao });
    } else {
      res.status(404).json({ error: 'Transação não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para excluir uma transação
exports.deleteTransacao = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Transacao.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Transação excluída com sucesso!' });
    } else {
      res.status(404).json({ error: 'Transação não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
