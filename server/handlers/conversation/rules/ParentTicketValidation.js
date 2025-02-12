const services = require("../../../services/index");

class ParentTicketValidation {
    async validate(conversation) {
        const parentId = await services.getParentTicketId.execute(conversation.ticket_id);

        if (!parentId) {
            return { isValid: false, message: `Nenhum ticket pai encontrado para o ticket ${conversation.ticket_id}` };
        }
        return { isValid: true, conversation: { parentId } };
    }
}

exports = { ParentTicketValidation }
