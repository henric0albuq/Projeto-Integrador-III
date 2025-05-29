const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    "postgres", // Nome do banco de dados
    "postgres.gudngldxnlftrfqndoor", // Usuário do banco (com o identificador do pooler)
    "Doris123!@#clara", // Senha do banco
    {
        host: "aws-0-sa-east-1.pooler.supabase.com", // Host do Pooler de Transações
        dialect: "postgres",
        port: 6543, // Porta do Pooler de Transações
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Permite certificados autoassinados
            },
        },
    }
);

module.exports = sequelize;