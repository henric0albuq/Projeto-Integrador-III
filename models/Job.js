const Sequelize = require("sequelize");
const db = require("../db/connection");

const Job = db.define("job", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, // Define como chave primária
        autoIncrement: true, // Define incremento automático
    },
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.STRING,
    },
    company: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    new_job: {
        type: Sequelize.INTEGER,
    },
}, {
    tableName: "job", // Nome exato da tabela no banco de dados
    timestamps: false, // Desativa createdAt e updatedAt
});

module.exports = Job;