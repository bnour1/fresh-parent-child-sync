exports.getParentTicketId = async function (ticketId) {
    try {
        const data = await $request.invokeTemplate("viewTicketIncludeRelated", {
            context: { ticketId }
        });
        const ticketData = JSON.parse(data.response);
        return ticketData?.ticket?.related_tickets?.parent_id || null;
    } catch (error) {
        console.error("Erro ao buscar ticket pai:", error);
        return null;
    }
};
