class WorkspaceValidation {
    constructor(expectedWorkspaceId) {
        this.expectedWorkspaceId = expectedWorkspaceId;
    }

    validate(data) {
        const { conversation } = data
        if (conversation.ticket_workspace_id !== this.expectedWorkspaceId) {
            return { isValid: false, message: `Workspace inválido (${conversation.ticket_workspace_id}). Esperado: ${this.expectedWorkspaceId}` };
        }
        return { isValid: true };
    }
}

exports = { WorkspaceValidation }
