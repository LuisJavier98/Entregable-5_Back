const router = require('express').Router()

const userServices = require('./users.services')
const passportJWT = require('../middlewares/auth.middleware')
const { participantMiddleware, accessToYourConversation, userMiddleware, userAlredyPosted } = require('../middlewares/participant.middleware')

router.route('/user')
    .get(passportJWT.authenticate('jwt', { session: false }), userServices.getAllUsers)
    .post(userServices.postUser)


router.route('/conversations')
    .get(passportJWT.authenticate('jwt', { session: false }), userServices.getAllConversations)
    .post(passportJWT.authenticate('jwt', { session: false }), participantMiddleware, userServices.postConversation)


router.route('/conversations/:conversationId')
    .get(passportJWT.authenticate('jwt', { session: false }), userServices.getConversationsById)
    .patch(passportJWT.authenticate('jwt', { session: false }), userServices.patchConversations)
    .delete(passportJWT.authenticate('jwt', { session: false }), userServices.deleteConversation)


router.route('/conversations/:conversationId/participants')
    .get(passportJWT.authenticate('jwt', { session: false }), userServices.getAllParticipants)
    .post(passportJWT.authenticate('jwt', { session: false }), userAlredyPosted, userMiddleware, userServices.postParticipant)

router.route('/conversations/:conversationId/participants/:participantId')
    .get(passportJWT.authenticate('jwt', { session: false }), userServices.getParticipantById)
    .delete(passportJWT.authenticate('jwt', { session: false }), userServices.deleteParticipant)

router.route('/conversations/:conversationId/messages')
    .get(passportJWT.authenticate('jwt', { session: false }), userServices.getAllMessages)
    .post(passportJWT.authenticate('jwt', { session: false }), userServices.postMessage)


router.route('/conversations/:conversationId/messages/:messageId')
    .get(passportJWT.authenticate('jwt', { session: false }), userServices.getMessageById)
    .delete(passportJWT.authenticate('jwt', { session: false }), userServices.deleteMessage)

module.exports = router
