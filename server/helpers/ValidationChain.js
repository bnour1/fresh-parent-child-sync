class ValidationChain {
    constructor() {
        this.rules = [];
    }

    addRule(rule) {
        this.rules.push(rule);
        return this; // Permite encadeamento fluido (ex: `chain.addRule().addRule()`)
    }

    async execute(data) {
        const result = { isValid: true, message: ""};

        for (const rule of this.rules) {
            const ruleResult = await rule.validate(data);
            if (!ruleResult.isValid) {
                return ruleResult; // Retorna erro imediatamente se alguma validação falhar
            }
        }
        return result;
    }
}

exports =  { ValidationChain }
