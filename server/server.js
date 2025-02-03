const conversationHandler = require("./handlers/conversationHandler");
const appLifecycleHandler = require("./handlers/appLifecycleHandler");

exports = {
  onConversationCreate: async function (args) {
    await conversationHandler.onConversationCreate(args)
  },
  onAppInstallHandler: function (args) {
    appLifecycleHandler.onAppInstallHandler(args)
  },
  onAppUninstallHandler: function (args) {
    appLifecycleHandler.onAppUninstallHandler(args)
  }
};
