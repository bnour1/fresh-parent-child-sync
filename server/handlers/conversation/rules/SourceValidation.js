class SourceValidation {
    constructor(expectedSource) {
        this.expectedSource = expectedSource;
    }

    validate(data) {
        const { conversation } = data
        if (!this.expectedSource.includes(conversation.source) || conversation.private) {
            return { isValid: false, message: `Fonte inválida (${conversation.source}). Esperado: ${this.expectedSource}` };
        }
        return {isValid: true};
    }
}

exports = { SourceValidation }
