const FormData = require("form-data");
const axios = require("axios");

exports.execute = async function (ticketId, message, attachments, apiKey) {
    try {
        const formData = new FormData();
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
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );
    } catch (error) {
        console.error(`Erro ao enviar resposta com anexo para ticket ${ticketId}:`, error.response ? error.response.data : error.message);
    }
};



