const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { nome, email, cpf, data_nascimento, senha, genero, id_tipo_usuario } = req.body;
  try {
    const newUser = await User.create({
      nome, email, cpf, data_nascimento, senha, genero, id_tipo_usuario
    });
    res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, data_nascimento, genero, id_tipo_usuario } = req.body;
  try {
    const [updated] = await User.update(
      { nome, email, cpf, data_nascimento, genero, id_tipo_usuario },
      { where: { id } }
    );
    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.json({ message: 'Usuário atualizado com sucesso!', user: updatedUser });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Usuário excluído com sucesso!' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
