const helpers = require("../../helpers/index")
const rules = require("./rules/index");
const services = require("../../services/index");

const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10MB

exports.execute = async function (conversation, iparams) {
    try {
        const { attachments, body, ticket_id, source, private: isPrivate } = conversation;
        let formFiles = [];
        if (attachments.length > 0) {
            const totalSize = attachments.reduce((sum, { size = 0 }) => sum + size, 0);
            if (totalSize <= MAX_ATTACHMENT_SIZE) {
                formFiles = (await Promise.all(attachments.map(services.downloadAttachment.execute)))
                    .filter(file => file !== null);
            } else {
                await services.sendNote.execute(ticket_id, "Anexos da resposta enviada excedem o tamanho permitido (10MB) por favor anexar arquivos diretamente no ticket relacionado", formFiles, iparams, true);
            }
        }
        const relatedTickets = await services.getRelatedTickets.execute(ticket_id);
        const ticketDestinationId = Array.isArray(relatedTickets) ? relatedTickets.at(-1) : relatedTickets;
        const sendMessage = source === 2 ? services.sendNote : services.sendReply;
        await sendMessage.execute(ticketDestinationId, body, formFiles, iparams, isPrivate);
        console.info(`Conversa replicada (Origem: Ticket #${ticket_id} ➝ Destino: Ticket #${ticketDestinationId})`);
    } catch (error) {
        console.error("Erro ao processar conversationCreateHandler:", error);
    }
};

exports.validate = async function (args) {
    const validationChain = new helpers.ValidationChain()
        .addRule(new rules.ActorValidation())
        .addRule(new rules.WorkspaceValidation(args.iparams.validWorkspaceId))
        .addRule(new rules.ParentChildValidation())
        .addRule(new rules.SourceValidation([0, 2]));
    const validationResult = await validationChain.execute(args.data);
    if (!validationResult.isValid) {
        return false;
    }
    return true;
};