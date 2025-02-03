const ticketService = require("../services/ticketService");
const replyService = require("../services/replyService");
const attachmentService = require("../services/attachmentService");

exports.onConversationCreate = async function (args) {
    try {
        const { conversation } = args.data;
        const { validWorkspaceId } = args.iparams;
        // Valida se é um workspace correto e origem interna
        if (conversation.ticket_workspace_id !== validWorkspaceId || conversation.source !== 0) return;
        // Obtém informações do ticket pai
        const parentId = await ticketService.getParentTicketId(30);
        if (!parentId) {
            return;
        }

        if (conversation.attachments.length > 0) {
            const formFile = await attachmentService.downloadAttachmentAsFormData(conversation.attachments[0], args.iparams.apiKey)
            console.log(formFile)
            await replyService.sendReplyWithAttachment(parentId, conversation.body, [formFile], args.iparams.apiKey);
        }
        await replyService.sendReply(parentId, conversation.body);
    } catch (error) {
        console.error("Erro ao processar onConversationCreate:", error);
    }
};
