/**
 * @swagger
 * components:
 *   schemas:
 *     UserModel:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           description: First name and the Last name of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         gender:
 *           type: string
 *           description: Gender of the user
 *           enum:
 *             - male
 *             - female
 *             - other
 *         password:
 *           type: string
 *           description: Password of the user
 *         confirmPassword:
 *           type: string
 *           description: confirm Password of the user
 *         userRole:
 *           type: string
 *           description: Role of the user
 *           enum:
 *             - user
 *             - admin
 *           default: user
 *         _id:
 *           type: string
 *           description: Unique identifier for the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user was created
 *       required:
 *         - fullName
 *         - email
 *         - gender
 *         - password
 *         - confirmPassword
 */

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user
 *     tags:
 *       -  A user
 *     requestBody:
 *       description: User object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserModel'
 *     responses:
 *       '201':
 *         description: A successful response, returns the newly created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserModel'
 *       '400':
 *         description: Invalid email format or missing required fields
 *       '409':
 *         description: Email already exists
 *       '500':
 *         description: Unexpected error
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Authenticate user and get a JWT token
 *     description: Authenticate user with email and password, and return a JWT token
 *     tags:
 *       - A user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserModel'
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user
 *       '401':
 *         description: Invalid email or password
 *       '500':
 *         description: Unexpected error
 */

/**
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags:
 *       - A user
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserModel'
 *       '500':
 *         description: Unexpected error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update details of an existing user
 *     tags:
 *       - A user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserModel'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserModel'
 *       '400':
 *         description: Invalid request data
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user based on their ID. Only the user who owns the account can delete their account.
 *     tags: [A user]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user making the request
 *             example:
 *               userId: 1234567890
 *     responses:
 *       '200':
 *         description: User successfully deleted
 *       '401':
 *         description: Only the user who owns the account can delete their account
 *       '404':
 *         description: User not found
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve details of a user by ID
 *     tags: [A user]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: Returns the user with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserModel'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
