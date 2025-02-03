const FormData = require("form-data");
const axios = require("axios");

exports.sendReply = async function (ticketId, message) {
    try {
        await $request.invokeTemplate("postReply", {
            context: {
                ticketId,
                contentType: "application/json"
            },
            body: JSON.stringify({ body: message })
        });
        console.info(`Resposta enviada ao ticket ${ticketId}`);
    } catch (error) {
        console.error(`Erro ao enviar resposta para ticket ${ticketId}:`, error);
    }
};

exports.sendReplyWithAttachment = async function (ticketId, message, attachments, apiKey) {
    try {
        let formData = new FormData();
        formData.append("body", message);
        attachments.forEach(({ formData: file, filename, contentType }) => {
            if (file) {
                formData.append("attachments[]", file.getBuffer(), { filename, contentType });
            }
        });
        await axios.post(
            `https://ssabrhelpdesk-ssabr-hml.freshservice.com/api/v2/tickets/${ticketId}/reply`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    "Authorization": `Basic ${apiKey}`
                },
                maxContentLength: Infinity, // Permite conteúdo grande
                maxBodyLength: Infinity // Evita limite no tamanho do corpo da requisição
            }
        );
    } catch (error) {
        console.error(`Erro ao enviar resposta com anexo para ticket ${ticketId}:`, error.response ? error.response.data : error.message);
    }
};



