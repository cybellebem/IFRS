/**
 * Componentes reutilizáveis da documentação OpenAPI.
 *
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   parameters:
 *     EventId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *         minimum: 1
 *       example: 1
 *     VolunteerId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *         minimum: 1
 *       example: 1
 *   responses:
 *     BadRequest:
 *       description: Dados inválidos.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *     Unauthorized:
 *       description: Token ausente, inválido ou expirado.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *     Forbidden:
 *       description: Usuário sem permissão (requer role admin).
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *     NotFound:
 *       description: Recurso não encontrado.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: Evento não encontrado.
 *     LoginInput:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: admin@ifrs.edu.br
 *         password:
 *           type: string
 *           example: "123456"
 *     AuthUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: admin@ifrs.edu.br
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           example: admin
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         user:
 *           $ref: '#/components/schemas/AuthUser'
 *     EventInput:
 *       type: object
 *       required: [nome, descricao, data, local, maximo_voluntarios]
 *       properties:
 *         nome:
 *           type: string
 *           example: Mutirão de Plantio
 *         descricao:
 *           type: string
 *           example: Plantio de mudas nativas no entorno do campus.
 *         data:
 *           type: string
 *           format: date
 *           example: "2026-12-05"
 *         local:
 *           type: string
 *           example: IFRS Campus Bento Gonçalves
 *         maximo_voluntarios:
 *           type: integer
 *           minimum: 1
 *           example: 10
 *     Event:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *         - $ref: '#/components/schemas/EventInput'
 *         - type: object
 *           properties:
 *             total_voluntarios:
 *               type: integer
 *               example: 3
 *     EventDetail:
 *       allOf:
 *         - $ref: '#/components/schemas/Event'
 *         - type: object
 *           properties:
 *             voluntarios:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Volunteer'
 *     VolunteerInput:
 *       type: object
 *       required: [nome, email]
 *       properties:
 *         nome:
 *           type: string
 *           example: Fernanda Lima
 *         email:
 *           type: string
 *           format: email
 *           example: fernanda.lima@email.com
 *         celular:
 *           type: string
 *           nullable: true
 *           example: "54999990007"
 *     Volunteer:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *         - $ref: '#/components/schemas/VolunteerInput'
 *     Dashboard:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Bem-vindo(a), admin@ifrs.edu.br!
 *         user:
 *           $ref: '#/components/schemas/AuthUser'
 *         totais:
 *           type: object
 *           properties:
 *             eventos:
 *               type: integer
 *             voluntarios:
 *               type: integer
 *             inscricoes:
 *               type: integer
 *             eventosLotados:
 *               type: integer
 *         proximosEventos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Event'
 */
