// ContactUsRoutes.ts
import { Router } from 'express';
import ContactUsController from '../Controllers/contactUsController';

const contactUsRoutes = Router();

contactUsRoutes.post('/post-contact-us', ContactUsController.createContactUs);
contactUsRoutes.put('/update-contact-us/:id', ContactUsController.updateContactUs);
contactUsRoutes.get('/getall-contact-us', ContactUsController.getAllContactUs);
contactUsRoutes.get('/getone-contact-us/:id', ContactUsController.getOneContactUs);
contactUsRoutes.delete('/delete-contact-us/:id', ContactUsController.deleteContactUs);

export default contactUsRoutes;
