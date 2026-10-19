const express = require("express");
const controller = require("../controllers/event.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();
const adminOnly = [authenticate, authorize("admin")];

/**
 * @openapi
 * /events:
 *   get:
 *     tags: [Eventos]
 *     summary: Lista os eventos sociais
 *     responses:
 *       '200':
 *         description: Lista de eventos com o total de voluntários inscritos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.get("/", controller.list);

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     tags: [Eventos]
 *     summary: Detalha um evento e seus voluntários
 *     parameters:
 *       - $ref: '#/components/parameters/EventId'
 *     responses:
 *       '200':
 *         description: Evento encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventDetail'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/:id", controller.show);

/**
 * @openapi
 * /events:
 *   post:
 *     tags: [Eventos]
 *     summary: Cadastra um evento (apenas admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       '201':
 *         description: Evento criado.
 *         headers:
 *           Location:
 *             description: Caminho do evento criado.
 *             schema:
 *               type: string
 *             example: /events/5
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 */
router.post("/", ...adminOnly, controller.create);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     tags: [Eventos]
 *     summary: Atualiza um evento (apenas admin)
 *     description: O novo limite de voluntários não pode ser menor que o número de inscritos.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/EventId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       '200':
 *         description: Evento atualizado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     tags: [Eventos]
 *     summary: Exclui um evento (apenas admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/EventId'
 *     responses:
 *       '204':
 *         description: Evento excluído.
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '403':
 *         $ref: '#/components/responses/Forbidden'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 */
router.put("/:id", ...adminOnly, controller.update);
router.delete("/:id", ...adminOnly, controller.remove);

/**
 * @openapi
 * /events/{id}/volunteers:
 *   post:
 *     tags: [Eventos]
 *     summary: Inscreve um voluntário no evento
 *     description: Regra de negócio — a inscrição é recusada (409) quando o evento atinge o limite máximo de voluntários.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/EventId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [voluntario_id]
 *             properties:
 *               voluntario_id:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       '201':
 *         description: Voluntário inscrito; retorna o evento atualizado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '409':
 *         description: Voluntário já inscrito ou evento lotado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/:id/volunteers", authenticate, controller.addVolunteer);

/**
 * @openapi
 * /events/{id}/volunteers/{volunteerId}:
 *   delete:
 *     tags: [Eventos]
 *     summary: Cancela a inscrição de um voluntário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/EventId'
 *       - in: path
 *         name: volunteerId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       '204':
 *         description: Inscrição cancelada.
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 */
router.delete("/:id/volunteers/:volunteerId", authenticate, controller.removeVolunteer);

module.exports = router;
