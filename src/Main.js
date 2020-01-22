const fs = require('fs');
const path = require('path');

const generateObject = require('./lib/generateObject');
const serializeObject = require('./lib/serializeObject');

const {
	getStlFilesList,
	saveSlicingTaskReqBody
} = require("./tools/fileManager");

const { STLS_FOLDER } = require("../const");

module.exports = function Main(){

    const stlFiles = getStlFilesList(STLS_FOLDER);
    
    stlFiles.forEach( stlFileName => {

        const stlFilePath = path.join(STLS_FOLDER, stlFileName);
        
        fs.readFile(stlFilePath, function(err, data) {
            
            // First thing to do after getting the file data is to generate the 3d object
            var object = generateObject(data);
            // When we have the 3d object, we can then generate the workspace file
            var rvwj = serializeObject(object, stlFileName);
            // When the workspace file is ready, now we can add it to the API request body
            const filenameWithoutExt = path.basename(
				stlFileName,
				path.extname(stlFileName)
			);
            
            // Save the workspace file 
            saveSlicingTaskReqBody(filenameWithoutExt + ".json", rvwj);
        });
    });


}


