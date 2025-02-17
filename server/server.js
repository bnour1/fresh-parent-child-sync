const conversationCreateHandler = require("./handlers/conversation/conversationCreateHandler");
const appInstallHandler = require("./handlers/app/appInstall");
const appUninstallHandler = require("./handlers/app/appUninstall");

exports = {
  onConversationCreate: async function (args) {
    try {
      const validScenario = await conversationCreateHandler.validate(args)
      if (validScenario) {
        await conversationCreateHandler.execute(args.data.conversation, args.iparams)
      }
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
