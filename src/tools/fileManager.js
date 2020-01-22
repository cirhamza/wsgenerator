const fs = require('fs');
const path = require('path');

const { WS_FILES_FOLDER } = require("../../const");

function getStlFilesList(stlFilesPath) {
	return fs.readdirSync(stlFilesPath, function(err, files) {
		if (err) {
			throw new Error("Error fetching list of files: " + err);
		}
	});
};

function saveSlicingTaskReqBody(filename, data) {

	const fullWsFilePath = path.join(WS_FILES_FOLDER, filename);
	
	return fs.writeFile(fullWsFilePath, data, function() {
		console.log(
			"File [ " +
				filename +
				" ] successfully saved at [ " +
				fullWsFilePath +
				" ]"
		);
	});
};

module.exports = {
	getStlFilesList,
	saveSlicingTaskReqBody
};