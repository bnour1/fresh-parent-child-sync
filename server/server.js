const conversationCreateHandler = require("./handlers/conversation/conversationCreateHandler");
const appInstallHandler = require("./handlers/app/appInstall");
const appUninstallHandler = require("./handlers/app/appUninstall");

exports = {
  onConversationCreate: async function (args) {
    try {
      const validationResult = await conversationCreateHandler.validate(args)
      if (!validationResult) {
        console.info(`Evento ignorado: ${validationResult.message}`);
      }
      await conversationCreateHandler.execute(args.data.conversation, args.iparams.apiKey)
      return;
    } catch (error) {
      console.error("Erro ao processar onConversationCreate:", error);
    }
  },
  onAppInstallHandler: function (args) {
    appInstallHandler.execute(args)
  },
  onAppUninstallHandler: function (args) {
    appUninstallHandler.execute(args)
  }
};
