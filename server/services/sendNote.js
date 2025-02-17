const FormData = require("form-data");
const axios = require("axios");

exports.execute = async function (ticketId, message, attachments, iparams, isPrivate) {
    try {
        const formData = new FormData();
        formData.append("body", message);
        formData.append("private", isPrivate.toString());
        attachments.forEach(({ formData: file, filename, contentType }) => {
            if (file) {
                formData.append("attachments[]", file.getBuffer(), { filename, contentType });
            }
        });
        await axios.post(
            `https://${iparams.host}/api/v2/tickets/${ticketId}/notes`,
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
        throw new Error(`Erro ao enviar Nota para o ticket ${ticketId}: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
    
};
