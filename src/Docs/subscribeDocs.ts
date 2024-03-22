/**
 * @swagger
 * components:
 *   schemas:
 *     subscribersModel:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the subscriber
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date and time when the subscriber was created
 *       required:
 *         - email
 */

/**
 * @swagger
 * /api/subscribe/post-subscribe:
 *   post:
 *     summary: Create a new subscribe
 *     description: Creates a new subscriber
 *     tags:
 *       - subscribers
 *     requestBody:
 *       description: subscriber object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/subscribersModel'
 *     responses:
 *       '201':
 *         description: A successful response, returns the newly created subscriber
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/subscribersModel'
 *       '400':
 *         description: Invalid email format
 *       '500':
 *         description: Unexpected error
 */

/**
 * @swagger
 * /api/subscribe/update-subscribe/{id}:
 *   put:
 *     summary: Update a subscribe
 *     description: Updates an existing subscriber
 *     tags:
 *       - subscribers
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the subscriber to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated subscriber object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/subscribersModel'
 *     responses:
 *       '200':
 *         description: A successful response, returns the updated subscriber
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/subscribersModel'
 *       '404':
 *         description: Subscription not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/subscribe/getall-subscribe:
 *   get:
 *     summary: Get all subscribers
 *     description: Retrieve a list of all subscribers
 *     tags:
 *       - subscribers
 *     responses:
 *       '200':
 *         description: A list of subscribers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/subscribersModel'
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/subscribe/getone-subscribe/{id}:
 *   get:
 *     summary: Get a single subscriber
 *     description: Retrieve details of a single subscriber
 *     tags:
 *       - subscribers
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the subscriber to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Details of the subscriber
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/subscribersModel'
 *       '404':
 *         description: Subscription not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/subscribe/delete-subscribe/{id}:
 *   delete:
 *     summary: Delete a subscriber
 *     description: Delete a subscriber by ID
 *     tags:
 *       - subscribers
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the subscriber to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Subscription deleted successfully
 *       '404':
 *         description: Subscription not found
 *       '500':
 *         description: Internal Server Error
 */
