exports.onAppInstallHandler = function (args) {
    console.info("App instalado com sucesso:", args);
    renderData();
};

exports.onAppUninstallHandler = function (args) {
    console.info("App desinstalado:", args);
    renderData();
};
