const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')
const Messages = require('./messages.models')
const Conversations = require('./conversations.models')
const Participants = require('./participants.models')

const initModels = () => {
    //? FK = RecoveryPasswords
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)

    //? FK =MESSAGES,CONVERSATIONS,PARTICIPANTS
    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)

    Users.hasMany(Messages)
    Messages.belongsTo(Users)

    Users.hasMany(Participants)
    Participants.belongsTo(Users)

    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)
    
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)

   



}

module.exports = initModels