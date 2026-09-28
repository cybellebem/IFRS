/**
 * @openapi
 * components:
 *   schemas:
 *     CreateProductInput:
 *       type: object
 *       required: [name, price, stock]
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           pattern: '\S'
 *           description: Nome com ao menos um caractere não branco.
 *           example: Teclado mecânico
 *         price:
 *           type: number
 *           minimum: 0
 *           exclusiveMinimum: true
 *           description: Preço maior que zero, em reais.
 *           example: 249.90
 *         stock:
 *           type: integer
 *           minimum: 0
 *           description: Quantidade disponível em estoque.
 *           example: 12
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateProductInput'
 *         - type: object
 *           required: [id]
 *           properties:
 *             id:
 *               type: integer
 *               minimum: 1
 *               readOnly: true
 *               description: Identificador gerado pela API.
 *               example: 1
 *     ErrorResponse:
 *       type: object
 *       required: [message]
 *       properties:
 *         message:
 *           type: string
 *           example: Produto não encontrado.
 */
