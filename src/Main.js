const fs = require("fs");
const path = require("path");

const generateObject = require("./lib/generateObject");
const serializeObject = require("./lib/serializeObject");

const {
	getStlFilesList,
	saveSlicingTaskReqBody
} = require("./tools/fileManager");

const { STLS_FOLDER } = require("../configs/const");

module.exports = function Slice({ useModifiers }) {
	const stlFiles = getStlFilesList(useModifiers);

	stlFiles.forEach(elem => {
		let stlFileName = "";
		let modifierOptions = null;

		if (useModifiers) {
			stlFileName = elem.filename;
			modifierOptions = elem.options;
		} else {
			filename = elem;
		}

		const stlFilePath = path.join(STLS_FOLDER, stlFileName);

		fs.readFile(stlFilePath, function(err, data) {
			// First thing to do after getting the file data is to generate the 3d object
			var object = generateObject(data);
			// When we have the 3d object, we can then generate the workspace file
			var rvwj = serializeObject(object, stlFileName, modifierOptions);
			// When the workspace file is ready, now we can add it to the API request body
			const filenameWithoutExt = path.basename(
				stlFileName,
				path.extname(stlFileName)
			);

			// Save the workspace file
			saveSlicingTaskReqBody(filenameWithoutExt + ".json", rvwj);
		});
	});
};
