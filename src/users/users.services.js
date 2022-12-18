const userControllers = require('./users.controllers')

//? Get, Post


const getAllUsers = (req, res) => {
    userControllers.findAllUsers()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

//?Get all my conversations
const getAllConversations = (req, res) => {
    userControllers.findAllConversations()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const getAllMessages = (req, res) => {
    const conversationId = req.params.conversationId
    userControllers.findAllMessages(conversationId)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const getAllParticipants = (req, res) => {
    const conversationId = req.params.conversationId
    userControllers.findAllParticipants(conversationId)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            }
            else {
                res.status(400).json({ message: "Invalid ID" })
            }

        })
        .catch(err => res.status(400).json({ message: err.message }))
}

const getConversationsById = (req, res) => {
    const id = req.params.conversationId
    userControllers.findConversationById(id)
        .then((data) => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: 'Invalid ID' })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}
const getMessageById = (req, res) => {
    const conversation_Id = req.params.conversationId
    const message_Id = req.params.messageId
    userControllers.findMessageById(message_Id, conversation_Id)
        .then((data) => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: 'Invalid ID' })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const getParticipantById = (req, res) => {
    const conversation_Id = req.params.conversationId
    const participant_Id = req.params.participantId
    userControllers.findParticipantById(participant_Id, conversation_Id)
        .then((data) => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: 'Invalid ID' })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const postUser = (req, res) => {
    const { firstName, lastName, email, password, profile_image, phone } = req.body
    userControllers.createUser({ firstName, lastName, email, password, profile_image, phone })
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message, fields: {
                    firstName: "string",
                    lastName: "string",
                    email: "exmaple@example.com",
                    password: "string",
                    profile_image: "string",
                    phone: "integer"
                }
            })
        })
}

const postConversation = (req, res) => {
    const { title, image_url, participantId } = req.body
    const userId = req.user.id
    userControllers.createConversation({ title, image_url, participantId, userId })
        .then((data) => res.status(201).json(data))
        .catch((err) => {
            res.status(400).json({
                message: err.message, fields: {
                    title: 'String',
                    image_url: 'String',
                    participantId: 'UUID'
                }
            })
        })
}

const postMessage = (req, res) => {
    const conversationId = req.params.conversationId
    const userId = req.user.id
    const { message } = req.body
    userControllers.createMessage({ userId, conversationId, message })
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message, fields: {
                    message: 'STRING'
                }
            })
        })
}

const postParticipant = (req, res) => {
    const conversationId = req.params.conversationId
    const { userId } = req.body
    userControllers.createParticipant({ conversationId, userId })
        .then(data => {
            res.status(200).json({ message: `Participant created in the conversation ${conversationId}` })
        })
        .catch(err => res.status(400).json({
            message: err.message, fields: {
                userId: 'UserId'
            }
        }))
}



//? Solo admins pueden ejecutarlo
const patchConversations = (req, res) => {
    const id = req.params.conversationId
    const { title, image_url } = req.body

    userControllers.updateConversation(id, { title, image_url })
        .then((data) => {
            if (data) {
                res.status(200).json({ message: `User edited succesfully with id: ${id}` })
            } else {
                res.status(404).json({ message: `User with id: ${id}, not found` })
            }
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message, fields: {
                    title: 'string',
                    image_url: 'string'
                }
            })
        })
}


//? Solo admins pueden ejecutarlo
const deleteConversation = (req, res) => {
    const id = req.params.conversationId
    userControllers.deleteConversation(id)
        .then((data) => {
            if (data) {
                res.status(204).json({ message: 'The conversation was deleted correctly' })
            } else {
                res.status(404).json({ message: `User with id:${id}, Not Found` })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}


const deleteMessage = (req, res) => {
    const id = req.params.messageId
    userControllers.deleteMessage(id)
        .then(() => {
            res.status(204).json({ message: 'The message was deleted correctly' })
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}

const deleteParticipant = (req, res) => {
    const id = req.params.participantId
    userControllers.deleteParticipant(id)
        .then((data) => {
            res.status(204).json({ message: `The participant ${id} was deleted correctly` })
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
}



module.exports = {
    getAllUsers,
    getAllConversations,
    getAllMessages,
    getConversationsById,
    getMessageById,
    getParticipantById,
    getAllParticipants,
    postUser,
    postConversation,
    postMessage,
    postParticipant,
    patchConversations,
    deleteConversation,
    deleteMessage,
    deleteParticipant
}
