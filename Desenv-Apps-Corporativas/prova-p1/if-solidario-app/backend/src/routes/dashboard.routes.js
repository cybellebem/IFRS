const express = require("express");
const controller = require("../controllers/dashboard.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @openapi
 * /dashboard:
 *   get:
 *     tags: [Dashboard]
 *     summary: Resumo do sistema (apenas usuários autenticados)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Indicadores e próximos eventos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dashboard'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get("/", authenticate, controller.show);

module.exports = router;
