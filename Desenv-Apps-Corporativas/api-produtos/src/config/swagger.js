const path = require("node:path");
const swaggerJsdoc = require("swagger-jsdoc");
const source = path.resolve(__dirname, "..").replace(/\\/g, "/");
const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API de Produtos",
      version: "1.0.0",
      description: "Catálogo de uma loja de tecnologia.",
    },
    servers: [
      {
        url: "/",
        description: "Servidor da aplicação",
      },
    ],
    tags: [
      {
        name: "Produtos",
        description: "Catálogo de produtos",
      },
    ],
  },
  apis: [`${source}/routes/*.js`, `${source}/docs/*.js`],
};
module.exports = swaggerJsdoc(options);
