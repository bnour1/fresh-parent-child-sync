const axios = require("axios");
const FormData = require("form-data");

exports.execute = async function (attachment) {
    if (!attachment?.attachment_url || !attachment?.name || !attachment?.content_type) {
        console.error("Erro: Objeto de anexo inválido ou incompleto.");
        return null;
    }
    try {
        const { name, attachment_url, content_type } = attachment;
        const data = await axios.get(attachment_url, {
            dataType: "arraybuffer",
            headers: { Accept: "*/*" },
            maxBodyLength: Infinity
        });

        const formData = new FormData();
        formData.append("attachments[]", data.data, { filename: name, contentType: content_type });
        return { formData, filename: name, contentType: content_type };
    } catch (error) {
        console.error(`Erro ao baixar o anexo ${attachment.id || "desconhecido"}:`, error?.response?.status, error?.response?.config);
        return null;
    }
};
