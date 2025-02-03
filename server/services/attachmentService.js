const axios = require("axios");
const FormData = require("form-data");

exports.downloadAttachmentAsFormData = async function (attachment, apiKey) {
    try {
        if (!attachment || !attachment.attachment_url || !attachment.name || !attachment.content_type) {
            console.error("Erro: Objeto de anexo inválido ou incompleto.");
            return null;
        }
        const { attachment_url, name, content_type} = attachment;
        // Fazer a requisição para baixar o anexo
        const response = await axios.get(attachment_url, {
            responseType: "arraybuffer",
            headers: { "Authorization": `Basic ${apiKey}`, "Accept": "*/*" }
        });
        // Criar FormData com o nome e content-type corretos
        let formData = new FormData();
        formData.append("attachments[]", response.data, { filename: name, contentType: content_type });
        return { formData, filename: name, contentType: content_type };
    } catch (error) {
        console.error(`Erro ao baixar o anexo ${attachment.id}:`, error.response ? error.response.data : error.message);
        return null;
    }
};
