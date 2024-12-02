const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');


const app = express();
const port = 3000;

app.use(express.json());
app.use(userRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados!');
    return sequelize.sync();
  })
  .catch(err => console.error('Não foi possível conectar ao banco de dados:', err));

  (async () => {
    await sequelize.sync({ force: false }); // reseta a tabela se necessário
    console.log("Tabelas sincronizadas!");
})();

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});  

