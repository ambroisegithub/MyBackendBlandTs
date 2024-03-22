/**
 * @swagger
 * components:
 *   schemas:
 *     BlogModel:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the Blog.
 *           readOnly: true
 *         blogTitle:
 *           type: string
 *           description: The title of the Blog.
 *           example: "My Blog"
 *         blogDescription:
 *           type: string
 *           description: The content of the Blog.
 *           example: "This is my Blog description."
 *         blogImage:
 *           type: string
 *           description: The URL of the image associated with the Blog.
 *           example: "https://example.com/images/my-Blog.jpg"
 *         blogDate:
 *           type: string
 *           format: date-time
 *           description: The date the Blog was created.
 *           readOnly: true
 */

/**
 * @swagger
 * /api/blog/post-blog:
 *   post:
 *     summary: Create a new Blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               blogImage:
 *                 type: string
 *                 format: binary
 *               blogTitle:
 *                 type: string
 *               blogDescription:
 *                 type: string
 *               blogDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '201':
 *         description: Successfully created a new Blog
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/BlogModel'
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad request, missing required fields
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/blog/update-blog/{id}:
 *   put:
 *     summary: Update an existing Blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Blog to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               blogImage:
 *                 type: string
 *                 format: binary
 *               blogTitle:
 *                 type: string
 *               blogDescription:
 *                 type: string
 *               blogDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '200':
 *         description: Successfully updated the Blog
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/BlogModel'
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad request, missing required fields
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/blog/getall-blog:
 *   get:
 *     summary: Get all Blogs
 *     tags: [Blogs]
 *     responses:
 *       '200':
 *         description: A list of all Blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BlogModel'
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/blog/getone-blog/{id}:
 *   get:
 *     summary: Get a single Blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Blog to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Returns the Blog object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogModel'
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/blog/delete-blog/{id}:
 *   delete:
 *     summary: Delete an existing Blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Blog to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Blog successfully deleted
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
