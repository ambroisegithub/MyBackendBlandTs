import { Request, Response } from "express";
import { Subscribe } from "../Models/subscribeModel";

class SubscribeController {
    static async createSubscribe(req: Request, res: Response) {
        try {
            // Check if email already exists
            const existingSubscribe = await Subscribe.findOne({ email: req.body.email });
            if (existingSubscribe) {
                return res.status(409).json({
                    message: "Email is already subscribed",
                });
            }

            const newSubscribe = new Subscribe({
                email: req.body.email,
                date: req.body.date,
            });

            const savedSubscribe = await newSubscribe.save();

            return res.status(201).json({
                data: savedSubscribe,
                message: "Subscription successfully created",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }
    }

    static async updateSubscribe(req: Request, res: Response) {
        try {
            const subscribeId = req.params.id;
            const subscribe = await Subscribe.findById(subscribeId);

            if (!subscribe) {
                return res.status(404).json({
                    message: "Subscription not found",
                });
            }

            const { email, date } = req.body;

            const updatedSubscribe = await Subscribe.findByIdAndUpdate(
                { _id: subscribeId },
                {
                    email: email ? email : subscribe.email,
                    date: date ? date : subscribe.date,
                },
                { new: true }
            );

            return res.status(200).json({
                data: updatedSubscribe,
                message: "Subscription successfully updated",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }
    }

    static async getAllSubscriptions(req: Request, res: Response) {
        try {
            const subscriptions = await Subscribe.find();
            return res.status(200).json({
                data: subscriptions,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }
    }

    static async getOneSubscription(req: Request, res: Response) {
        try {
            const subscription = await Subscribe.findById(req.params.id);

            if (subscription) {
                return res.status(200).json({
                    data: subscription,
                });
            } else {
                return res.status(404).json({
                    message: "Subscription not found",
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }
    }

    static async deleteSubscription(req: Request, res: Response) {
   
            // const subscriptionId = req.params.id;
            const subscriptionId = await Subscribe.findById(req.params.id);

            await Subscribe.findByIdAndDelete(subscriptionId);
            return res.status(204).json({
                message: 'Subscription deleted successfully',
            });

    }
}

export default SubscribeController;
