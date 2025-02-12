class SourceValidation {
    constructor(expectedSource) {
        this.expectedSource = expectedSource;
    }

    validate(conversation) {
        if (conversation.source !== this.expectedSource) {
            return { isValid: false, message: `Fonte inválida (${conversation.source}). Esperado: ${this.expectedSource}` };
        }
        return { isValid: true };
    }
}

exports = { SourceValidation }
