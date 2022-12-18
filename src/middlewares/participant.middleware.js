//? Previamente tiene que pasar por el middleware de autenticación

const { userIdExist, findConversationById, createParticipant } = require("../users/users.controllers")


const participantMiddleware = (req, res, next) => {
    const { participantId } = req.body
    userIdExist(participantId)
        .then(data => next())
        .catch(err => res.status(400).json({
            message: "This userId doesnt exist", fields:
            {
                title: 'String',
                image_url: 'String',
                participantId: 'UUID'

            }
        }))
}

const userMiddleware = (req, res, next) => {
    const { userId } = req.body
    userIdExist(userId)
        .then(data => next())
        .catch(err => res.status(400).json({
            message: "This userId doesnt exist", fields:
            {
                userId: 'userId',
            }
        }))
}

const userAlredyPosted = (req, res, next) => {
    const { userId } = req.body
    const conversationId = req.params.conversationId
    createParticipant({ userId, conversationId })
        .then(data => {
            if (userId === data.userId) {
                res.status(400).json({ message: 'User is already in the conversation ' })
            }
            else {
                next()
            }
        })
        .catch(err => res.status(400).json({
            message: err.message, fields:
            {
                userId: 'userId',
            }
        }))
}

module.exports = {
    participantMiddleware,
    userMiddleware,
    userAlredyPosted
}

