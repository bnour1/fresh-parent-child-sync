const helpers = require("../../helpers/index")
const rules = require("./rules/index");
const services = require("../../services/index");

exports.execute = async function (conversation, apiKey) {
    try {
        const parentId = await services.getParentTicketId.execute(conversation.ticket_id);
        let formFiles = []
        const { attachments, body } = conversation;
        const validationResult = await new helpers.ValidationChain()
            .addRule(new rules.AttachmentValidation())
            .execute({ attachments });

        if (validationResult.isValid) {
            formFiles = (await Promise.all(attachments.map(services.downloadAttachment.execute)))
                .filter(file => file !== null);
        } else {
            console.info(validationResult.message);
        }
        await services.sendReply.execute(parentId, body, formFiles, apiKey);
        console.info(`Resposta enviada para o ticket pai (ID: ${parentId})`);
    } catch (error) {
        console.error("Erro ao processar execute:", error);
    }
};


exports.validate = async function (args) {
    const validationChain = new helpers.ValidationChain()
        .addRule(new rules.WorkspaceValidation(args.iparams.validWorkspaceId))
        .addRule(new rules.SourceValidation(0))
        .addRule(new rules.ParentTicketValidation());
    const validationResult = await validationChain.execute(args.data.conversation);
    if (!validationResult.isValid) {
        console.info(`Evento ignorado: ${validationResult.message}`);
        return false;
    }
    return true;
};
