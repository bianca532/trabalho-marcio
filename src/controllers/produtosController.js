// controllers/ProdutosController.js
const Produto = require('../models/produtos');

// Função para criar um novo produto
exports.createProduto = async (req, res) => {
  const { nome, descricao, valor, custo, quantidade, codigo, id_categoria } = req.body;
  try {
    const newProduto = await Produto.create({
      nome, descricao, valor, custo, quantidade, codigo, id_categoria
    });
    res.status(201).json({ message: 'Produto criado com sucesso!', produto: newProduto });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para listar todos os produtos
exports.getProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para obter um único produto pelo ID
exports.getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByPk(id);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(produto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para atualizar um produto
exports.updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, valor, custo, quantidade, codigo, id_categoria } = req.body;
  try {
    const [updated] = await Produto.update(
      { nome, descricao, valor, custo, quantidade, codigo, id_categoria },
      { where: { id } }
    );
    if (updated) {
      const updatedProduto = await Produto.findByPk(id);
      res.json({ message: 'Produto atualizado com sucesso!', produto: updatedProduto });
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função para excluir um produto
exports.deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Produto.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Produto excluído com sucesso!' });
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
