exports = {
  // args is a JSON block containing the payload information.
  // args['iparam'] will contain the installation parameter values.
  onConversationCreate: function (args) {
    if(args.data.conversation.ticket_workspace_id == args.iparams['Workspace ID']){
      console.log(args)
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
