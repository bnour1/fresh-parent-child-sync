exports = {
  // args is a JSON block containing the payload information.
  // args['iparam'] will contain the installation parameter values.
  onConversationCreate: function (args) {
    let workspace = 7
    if (args.iparams['Workspace ID'] == workspace) {
      console.log("teste")
    }
  },
  onAppInstallHandler: function (args) {
    console.info('onAppInstallHandler invoked with following data: \n', args);
    renderData();
  },
  onAppUninstallHandler: function (args) {
    console.log('onAppUninstalHandler invoked with following data: \n', args);
    renderData();
  }

};
