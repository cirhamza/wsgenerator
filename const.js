const path = require('path');

const ASSETS_FOLDER = path.join(__dirname,"assets");
const STLS_FOLDER = path.join(ASSETS_FOLDER, "stls");
const WS_FILES_FOLDER = path.join(ASSETS_FOLDER, "wsfiles");


module.exports = {
	ASSETS_FOLDER,
	STLS_FOLDER,
	WS_FILES_FOLDER
};