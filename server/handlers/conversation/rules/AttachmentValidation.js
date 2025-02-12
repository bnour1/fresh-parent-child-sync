const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10MB

class AttachmentValidation {
    validate(conversation) {
        if (!conversation.attachments || conversation.attachments.length === 0) {
            return { isValid: false, message: "Nenhum anexo presente. Enviando apenas a nota." };
        }

        const totalSize = conversation.attachments.reduce((sum, attachment) => sum + (attachment.size || 0), 0);

        if (totalSize >= MAX_ATTACHMENT_SIZE) {
            return { isValid: false, message: `Tamanho total dos anexos (${totalSize} bytes) excede o limite de 10MB. Enviando apenas a nota.` };
        }

        return { isValid: true };
    }
}

exports = { AttachmentValidation }
