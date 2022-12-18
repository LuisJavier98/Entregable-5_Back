//? Previamente tiene que pasar por el middleware de autenticación

const { findUserById, findParticipantbyUserId } = require("../users/users.controllers")


const participantMiddleware = (req, res, next) => {
    const { participantId } = req.body
    userIdExist(participantId)
        .then(data => {
            if (data) {
                next()
            }
            else {
                res.status(400).json({
                    message: "You can only create a conversation with an user created ", fields:
                    {
                        title: 'String',
                        image_url: 'String',
                        participantId: 'UUID'

                    }
                })
            }
        })
        .catch(err => res.status(400).json({
            message: "You can only create a conversation with an user created", fields:
            {
                title: 'String',
                image_url: 'String',
                participantId: 'UUID'

            }
        }))
}

const userMiddleware = (req, res, next) => {
    const { userId } = req.body
    findUserById(userId)
        .then(data => next())
        .catch(err => res.status(400).json({
            message: "Please, introduce an userId created before", fields:
            {
                userId: 'userId',
            }
        }))
}

const userAlredyPosted = (req, res, next) => {
    const { userId } = req.body
    const conversationId = req.params.conversationId
    findParticipantbyUserId(userId, conversationId)
        .then(data => {
            if (data) {
                res.status(400).json({ message: 'this partcipant is already created' })
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

