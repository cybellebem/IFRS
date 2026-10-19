const path = require("node:path");
const swaggerJsdoc = require("swagger-jsdoc");

const source = path.resolve(__dirname, "..").replace(/\\/g, "/");

/** Especificação OpenAPI gerada a partir dos comentários `@openapi`. */
module.exports = swaggerJsdoc({
  failOnErrors: true,
  definition: {
    openapi: "3.0.3",
    info: {
      title: "IF Solidário — API de Voluntariado",
      version: "1.0.0",
      description:
        "Gerenciamento de voluntários e eventos sociais do IFRS. " +
        "Faça login em POST /auth/login e use o token no botão Authorize.",
    },
    servers: [{ url: "/", description: "Servidor da aplicação" }],
    tags: [
      { name: "Autenticação", description: "Login e dados do usuário" },
      { name: "Dashboard", description: "Rota protegida" },
      { name: "Eventos", description: "Eventos sociais e inscrições" },
      { name: "Voluntários", description: "Cadastro de voluntários" },
    ],
  },
  apis: [`${source}/routes/*.js`, `${source}/docs/*.js`],
});
