import { ContactUs, validateContactUsModelData} from "../Models/contactUsmodels";
import { Request, Response } from "express";

class ContactUsController {
  static async createContactUs(req: Request, res: Response) {
    try {
      const { error } = validateContactUsModelData(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      const newContact = new ContactUs({
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress,
        subject: req.body.subject,
        message: req.body.message,
      });

      const savedContact = await newContact.save();

      return res.status(201).json({
        data: savedContact,
        message: "Contact request successfully created",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  static async updateContactUs(req: Request, res: Response) {
    try {
      const contactId = req.params.id;
      const contact = await ContactUs.findById(contactId);

      if (!contact) {
        return res.status(404).json({
          message: "Contact request not found",
        });
      }

      const { fullName, phoneNumber, emailAddress, subject, message } = req.body;

      const updatedContact = await ContactUs.findByIdAndUpdate(
        { _id: contactId },
        {
          fullName: fullName ? fullName : contact.fullName,
          phoneNumber: phoneNumber ? phoneNumber : contact.phoneNumber,
          emailAddress: emailAddress ? emailAddress : contact.emailAddress,
          subject: subject ? subject : contact.subject,
          message: message ? message : contact.message,
        },
        { new: true }
      );

      return res.status(200).json({
        data: updatedContact,
        message: "Contact request successfully updated",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  static async getAllContactUs(req: Request, res: Response) {
    try {
      const contacts = await ContactUs.find();
      return res.status(200).json({
        data: contacts,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  static async getOneContactUs(req: Request, res: Response) {
    try {
      const contact = await ContactUs.findById(req.params.id);

      if (contact) {
        return res.status(200).json({
          data: contact,
        });
      } else {
        return res.status(404).json({
          message: "Contact request not found",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  static async deleteContactUs(req: Request, res: Response) {
    try {
      const contactId = req.params.id;
      const contact = await ContactUs.findById(contactId);

      if (!contact) {
        return res.status(404).json({
          message: "Contact request not found",
        });
      }

      await ContactUs.findByIdAndDelete(contactId);
      return res.status(204).json({
        message: 'Contact request deleted successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default ContactUsController;
