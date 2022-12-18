const uuid = require('uuid')
const Conversations = require('../models/conversations.models')
const Messages = require('../models/messages.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')
const { hashPassword } = require('../utils/crypto')

//?FIND
const findAllUsers = async () => {
    const data = Users.findAll({
        include: [{
            model: Participants,
            include: [{
                model: Conversations
            }]
        }]
    })
    return data
}

const findAllParticipants = async (conversationId) => {
    const data = Participants.findAll({
        where: {
            conversationId: conversationId
        }
    })
    return data
}

const findUserById = async (id) => {
    const data = await Users.findOne({
        where: {
            id: id
        }
    })
    return data
}

const findAllConversations = async (id) => {
    const data = await Conversations.findAll({
        where: {
            userId: id
        }
    })
    return data
}

const findAllMessages = async (conversationId) => {
    const data = await Messages.findAll({
        where: {
            conversationId: conversationId
        }
    })
    return data
}


//?CREATE

const createUser = async (obj) => {
    const data = await Users.create({
        id: uuid.v4(),
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        password: hashPassword(obj.password),
        profile_image: obj.profile_image,
        phone: obj.phone
    })
    return data
}

const createConversation = async (obj) => {
    const data = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        image_url: obj.image_url,
        userId: obj.userId
    })
    await Participants.create({
        id: uuid.v4(),
        conversationId: data.id,
        userId: obj.userId
    })
    await Participants.create({
        id: uuid.v4(),
        conversationId: data.id,
        userId: obj.participantId
    })
    return data
}

const createMessage = async (obj) => {
    const data = await Messages.create({
        id: uuid.v4(),
        userId: obj.userId,
        conversationId: obj.conversationId,
        message: obj.message,
    })
    return data
}

const createParticipant = async (obj) => {
    const data = Participants.create({
        id: uuid.v4(),
        conversationId: obj.conversationId,
        userId: obj.userId
    })
    return data
}

const findMessageById = async (message_Id, conversation_Id) => {
    const data = await Messages.findOne({
        where: {
            id: message_Id,
            conversationId: conversation_Id
        }
    })
    return data
}

const findConversationById = async (id) => {
    const data = await Conversations.findOne({
        where: {
            id: id
        }
    })
    return data
}

const findParticipantById = async (id, conversation_Id) => {
    const data = Participants.findOne({
        where: {
            id: id,
            conversationId: conversation_Id

        }
    })
    return data
}

const findParticipantbyUserId = async (userId, conversation_Id) => {
    const data = Participants.findOne({
        where: {
            userId: userId,
            conversationId: conversation_Id
        }
    })
    return data
}


const updateConversation = async (id, obj) => {
    const data = await Conversations.update(obj, {
        where: {
            id: id
        }
    })
    return data
}

const deleteConversation = async (id) => {
    await Participants.destroy({
        where: {
            conversationId: id
        }
    })
    await Messages.destroy({
        where: {
            conversationId: id
        }
    })
    const data = await Conversations.destroy({
        where: {
            id: id
        }
    })
    return data
}


const deleteMessage = async (id) => {
    const data = await Messages.destroy({
        where: {
            id: id
        }
    })
    return data
}


const deleteParticipant = async (id) => {
    const data = Participants.destroy(
        {
            where: {
                id: id
            }
        }
    )
    return data
}


const findUserByEmail = async (email) => {
    const data = await Users.findOne({
        where: {
            email: email
        }
    })
    return data
}



module.exports = {
    findAllUsers,
    findAllConversations,
    findAllMessages,
    findAllParticipants,
    findUserById,
    findConversationById,
    findMessageById,
    findUserByEmail,
    findParticipantById,
    createUser,
    createConversation,
    createMessage,
    createParticipant,
    updateConversation,
    deleteConversation,
    deleteMessage,
    deleteParticipant,
    findParticipantbyUserId
}
