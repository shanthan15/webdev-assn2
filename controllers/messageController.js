const Message = require('../models/Message');
exports.sendMessage = async (req, res) => {
    const { receiverId, text } = req.body;
    const message = new Message({ sender: req.user.id, receiver: receiverId, text });
    await message.save();
    res.status(201).json({ message: 'Message sent' });
};

exports.getMessages = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const messages = await Message.find({
        $or: [
            { sender: req.user.id },
            { receiver: req.user.id }
        ]
    })
        .sort({ timestamp: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
    res.json(messages);
};
