const path = require("path");
const root_folder = path.join(__dirname, "../");

const ASSETS_FOLDER = path.join(root_folder, "assets");
const STLS_FOLDER = path.join(ASSETS_FOLDER, "stls");
const WS_FILES_FOLDER = path.join(ASSETS_FOLDER, "wsfiles");

const CONFIGS_FOLDER = path.join(root_folder, "configs");
const PRINTERS_LIST = path.join(CONFIGS_FOLDER, "printers.json");
const STL_CONFIGS = path.join(CONFIGS_FOLDER, "stl_configs.json");

module.exports = {
	ASSETS_FOLDER,
	STLS_FOLDER,
	WS_FILES_FOLDER,
	CONFIGS_FOLDER,
	PRINTERS_LIST,
	STL_CONFIGS
};
