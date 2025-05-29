const sequelize = require("./db/connection"); // Caminho correto para importar connection.js // Importando a conexão do seu arquivo connection.js

sequelize.authenticate()
  .then(() => console.log("Conexão com Supabase bem-sucedida!"))
  .catch((err) => console.error("Erro ao conectar:", err));
