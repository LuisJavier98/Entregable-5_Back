const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Conversations = require("./conversations.models");
const Users = require("./users.models");

const Participants = db.define('participant', {

    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Conversations,
            key: 'id'
        },
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        },
        allowNull: false
    }

})


module.exports = Participants