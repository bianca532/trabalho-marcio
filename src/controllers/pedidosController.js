
const Pedido = require('../models/pedidos');

exports.createPedido = async (req, res) => {
  const { codigo, data_pedido, total, status_pedido, id_usuario, id_tipo_pagamento, id_transacao, data_conclusao } = req.body;
  try {
    const newPedido = await Pedido.create({
      codigo, data_pedido, total, status_pedido, id_usuario, id_tipo_pagamento, id_transacao, data_conclusao
    });
    res.status(201).json({ message: 'Pedido criado com sucesso!', pedido: newPedido });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPedidoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePedido = async (req, res) => {
  const { id } = req.params;
  const { codigo, data_pedido, total, status_pedido, id_usuario, id_tipo_pagamento, id_transacao, data_conclusao } = req.body;
  try {
    const [updated] = await Pedido.update(
      { codigo, data_pedido, total, status_pedido, id_usuario, id_tipo_pagamento, id_transacao, data_conclusao },
      { where: { id } }
    );
    if (updated) {
      const updatedPedido = await Pedido.findByPk(id);
      res.json({ message: 'Pedido atualizado com sucesso!', pedido: updatedPedido });
    } else {
      res.status(404).json({ error: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePedido = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Pedido.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Pedido excluído com sucesso!' });
    } else {
      res.status(404).json({ error: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
