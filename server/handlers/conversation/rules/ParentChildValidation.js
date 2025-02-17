const services = require("../../../services/index");

class ParentChildValidation {
    async validate(data) {
        const { conversation } = data
        const relatedTickets = await services.getRelatedTickets.execute(conversation.ticket_id);
        if (!relatedTickets) {
            return { isValid: false, message: `Nenhum ticket pai encontrado para o ticket ${conversation.ticket_id}` };
        }
        return { isValid: true };
    }
}

exports = { ParentChildValidation }
