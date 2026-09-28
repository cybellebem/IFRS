const express = require("express");
const controller = require("../controllers/products.controller");

const router = express.Router();

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags: [Produtos]
 *     summary: Lista os produtos cadastrados
 *     responses:
 *       '200':
 *         description: Lista retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *             example:
 *               - id: 1
 *                 name: Teclado mecânico
 *                 price: 249.90
 *                 stock: 12
 */
router.get("/", controller.listProducts);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     tags: [Produtos]
 *     summary: Busca um produto pelo identificador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     responses:
 *       '200':
 *         description: Produto encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Identificador inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: Produto não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", controller.getProductById);

/**
 * @openapi
 * /api/products:
 *   post:
 *     tags: [Produtos]
 *     summary: Cadastra um produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductInput'
 *     responses:
 *       '201':
 *         description: Produto cadastrado.
 *         headers:
 *           Location:
 *             description: Caminho do produto criado.
 *             schema:
 *               type: string
 *             example: /api/products/3
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Nome, preço ou estoque inválido ou ausente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               message: O preço deve ser um número maior que zero.
 */
router.post("/", controller.createProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     tags: [Produtos]
 *     summary: Exclui um produto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       '204':
 *         description: Produto excluído, sem corpo na resposta.
 *       '400':
 *         description: Identificador inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: Produto não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", controller.deleteProduct);

module.exports = router;
