class WorkspaceValidation {
    constructor(expectedWorkspaceId) {
        this.expectedWorkspaceId = expectedWorkspaceId;
    }

    validate(conversation) {
        if (conversation.ticket_workspace_id !== this.expectedWorkspaceId) {
            return { isValid: false, message: `Workspace inválido (${conversation.ticket_workspace_id}). Esperado: ${this.expectedWorkspaceId}` };
        }
        return { isValid: true };
    }
}

exports = { WorkspaceValidation }
