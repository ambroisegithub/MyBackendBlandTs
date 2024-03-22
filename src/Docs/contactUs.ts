/**
 * @swagger
 * components:
 *   schemas:
 *     ContactUs:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           description: Full name of the contact person
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the contact person
 *         emailAddress:
 *           type: string
 *           description: Email address of the contact person
 *         subject:
 *           type: string
 *           description: Subject of the contact message
 *         message:
 *           type: string
 *           description: Content of the contact message
 *       required:
 *         - fullName
 *         - phoneNumber
 *         - emailAddress
 *         - subject
 *         - message
 */

/**
 * @swagger
 * /api/contactus/post-contact-us:
 *   post:
 *     summary: Create a new contact request
 *     description: Creates a new contact request
 *     tags:
 *       - ContactUs
 *     requestBody:
 *       description: Contact request object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactUs'
 *     responses:
 *       '201':
 *         description: A successful response, returns the newly created contact request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactUs'
 *       '400':
 *         description: Invalid request format or missing required fields
 *       '500':
 *         description: Unexpected error
 */

/**
 * @swagger
 * /api/contactus/update-contact-us/{id}:
 *   put:
 *     summary: Update a contact request by ID
 *     description: Updates a contact request based on its ID
 *     tags:
 *       - ContactUs
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the contact request to update
 *     requestBody:
 *       description: Updated contact request object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactUs'
 *     responses:
 *       '200':
 *         description: Contact request successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactUs'
 *       '400':
 *         description: Invalid request format or missing required fields
 *       '404':
 *         description: Contact request not found
 *       '500':
 *         description: Unexpected error
 */

/**
 * @swagger
 * /api/contactus/getall-contact-us:
 *   get:
 *     summary: Get all contact requests
 *     description: Retrieves a list of all contact requests
 *     tags:
 *       - ContactUs
 *     responses:
 *       '200':
 *         description: A list of contact requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactUs'
 *       '500':
 *         description: Unexpected error
 */

/**
 * @swagger
 * /api/contactus/getone-contact-us/{id}:
 *   get:
 *     summary: Get a contact request by ID
 *     description: Retrieves a contact request based on its ID
 *     tags:
 *       - ContactUs
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the contact request to retrieve
 *     responses:
 *       '200':
 *         description: Returns the contact request with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactUs'
 *       '404':
 *         description: Contact request not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/contactus/delete-contact-us/{id}:
 *   delete:
 *     summary: Delete a contact request by ID
 *     description: Deletes a contact request based on its ID
 *     tags:
 *       - ContactUs
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the contact request to delete
 *     responses:
 *       '204':
 *         description: Contact request successfully deleted
 *       '404':
 *         description: Contact request not found
 *       '500':
 *         description: Unexpected error
 */
