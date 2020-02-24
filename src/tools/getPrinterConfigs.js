const { PRINTERS_LIST } = require("../../configs/const");

module.exports = function getPrinterConfigs() {
	return require(PRINTERS_LIST)[0];
};
