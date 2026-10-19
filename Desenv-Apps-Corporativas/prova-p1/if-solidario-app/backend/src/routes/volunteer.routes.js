const express = require("express");
const controller = require("../controllers/volunteer.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authenticate);

/**
 * @openapi
 * /volunteers:
 *   get:
 *     tags: [Voluntários]
 *     summary: Lista os voluntários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de voluntários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Volunteer'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *   post:
 *     tags: [Voluntários]
 *     summary: Cadastra um voluntário (apenas admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VolunteerInput'
 *     responses:
 *       '201':
 *         description: Voluntário criado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Volunteer'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *       '409':
 *         description: E-mail já cadastrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", controller.list);
router.post("/", authorize("admin"), controller.create);

/**
 * @openapi
 * /volunteers/{id}:
 *   get:
 *     tags: [Voluntários]
 *     summary: Busca um voluntário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/VolunteerId'
 *     responses:
 *       '200':
 *         description: Voluntário encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Volunteer'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     tags: [Voluntários]
 *     summary: Atualiza um voluntário (apenas admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/VolunteerId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VolunteerInput'
 *     responses:
 *       '200':
 *         description: Voluntário atualizado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Volunteer'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '409':
 *         description: E-mail já cadastrado para outro voluntário.
 *   delete:
 *     tags: [Voluntários]
 *     summary: Exclui um voluntário (apenas admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/VolunteerId'
 *     responses:
 *       '204':
 *         description: Voluntário excluído.
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/:id", controller.show);
router.put("/:id", authorize("admin"), controller.update);
router.delete("/:id", authorize("admin"), controller.remove);

module.exports = router;
