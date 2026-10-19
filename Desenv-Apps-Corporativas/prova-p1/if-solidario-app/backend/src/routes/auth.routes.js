const express = require("express");
const controller = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Autenticação]
 *     summary: Autentica um usuário e gera o token JWT
 *     description: "Usuários fictícios: admin@ifrs.edu.br / 123456 (admin) e usuario@ifrs.edu.br / 123456 (user)."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       '200':
 *         description: Login realizado. O payload do token é `{ email, role }`.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         description: E-mail ou senha inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/login", controller.login);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags: [Autenticação]
 *     summary: Retorna o usuário do token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Payload do token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthUser'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get("/me", authenticate, controller.me);

module.exports = router;
