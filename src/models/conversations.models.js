const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Users = require("./users.models");

const Conversations = db.define('conversation', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        validate: {
            len: [0, 30]
        },
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    }
})

module.exports = Conversations