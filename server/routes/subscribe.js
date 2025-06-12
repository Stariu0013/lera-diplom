const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Subscription = require('../models/subscription');

router.post('/subscribe', async (req, res) => {
    const { type, date, email, price } = req.body;

    if (!type || !date || !email || !price) {
        return res.status(400).json({ error: 'All fields are required: type, data, email, price' });
    }

    try {
        const subscription = new Subscription({
            type,
            date,
            email,
            price,
        });

        await subscription.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: 'budgettracker65@gmail.com',
            to: 'busygirl2003@gmail.com',
            subject: `Нагадування про регулярний платіж - ${type}`,
            text: `
Вітаємо!

Ми нагадуємо про Ваш регулярний платіж у категорії ${type}.

Дата наступного платежу: ${date}.
Сума платежу становить: ${price} грн.

Дякуємо, що користуєтесь нашими послугами!

У разі неактуальності нагадувань, просимо Вас внести зміни в налаштування профілю!

Гарного дня!
            `,
        };

        // Send subscription confirmation email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: `Subscription email sent to ${email}` });
    } catch (error) {
        console.error('Error processing subscription:', error);

        // Handle duplicate email errors or other database errors
        if (error.code === 11000) {
            return res
                .status(409)
                .json({ error: 'This email is already subscribed.' });
        }

        res.status(500).json({ error: 'Failed to process subscription.' });
    }
});
router.get('/subscriptions', async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ error: 'Failed to fetch subscriptions.' });
    }
});

router.delete('/subscriptions/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSubscription = await Subscription.findByIdAndDelete(id);

        if (!deletedSubscription) {
            return res.status(404).json({ error: 'Subscription not found.' });
        }

        res.status(200).json({ message: 'Subscription deleted successfully.', deletedSubscription });
    } catch (error) {
        console.error('Error deleting subscription:', error);
        res.status(500).json({ error: `Failed to delete subscription. ${error.message}` });
    }
});

module.exports = router;