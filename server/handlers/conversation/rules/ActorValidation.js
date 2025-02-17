class ActorValidation {
    validate(data) {
        if (data.actor.profile_id === 19000130143) {
            return { isValid: false, message: `Ator Invalido` };
        }
        return { isValid: true };
    }
}

exports = { ActorValidation }
