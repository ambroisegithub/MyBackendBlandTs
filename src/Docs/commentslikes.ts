/**
 * @swagger
 * /api/comlike/add-comment/{blogId}:
 *   post:
 *     summary: Add a comment to a blog.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to add the comment to.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogSubject:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Comment added successfully.
 *       '400':
 *         description: Invalid request data.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal Server Error.
 */

// ================================================================

/**
 * @swagger
 * /api/comlike/like/{blogId}:
 *   post:
 *     summary: Like a blog
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the blog to like
 *     responses:
 *       "201":
 *         description: Blog liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating successful liking of the blog
 *                 likes:
 *                   type: number
 *                   description: Total number of likes on the blog after the like action
 *       "400":
 *         description: You have already liked this blog
 *       "401":
 *         description: Unauthorized user
 *       "404":
 *         description: Blog not found
 *       "500":
 *         description: Internal server error
 */
