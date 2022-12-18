const { DataTypes } = require('sequelize')
const Users = require('./users.models')
const db = require('../utils/database')
const Conversations = require('./conversations.models')

const Messages = db.define('message', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Conversations,
            key: 'id'
        }
    },
    message: {
        type: DataTypes.STRING,
        validate: {
            len: [0, 255]
        },
        allowNull: false
    }
})

module.exports = Messages