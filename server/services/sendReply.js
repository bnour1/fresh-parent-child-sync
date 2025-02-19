const FormData = require("form-data");
const axios = require("axios");

exports.execute = async function (ticketId, message, attachments, iparams) {
    try {
        const formData = new FormData();
        formData.append("body", message);
        attachments.forEach(({ formData: file, filename, contentType }) => {
            if (file) {
                formData.append("attachments[]", file.getBuffer(), { filename, contentType });
            }
        });
        await axios.post(
            `https://${iparams.host}/api/v2/tickets/${ticketId}/reply`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    "Authorization": `Basic ${iparams.apiKey}`
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );
    } catch (error) {
        console.error(`Erro ao enviar resposta para o ticket ${ticketId}:`, error.response ? error.response.data : error.message);
    }
};
