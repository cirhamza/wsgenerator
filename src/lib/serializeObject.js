var generateWorkspaceFile = require('../lib/generateWorkspaceFile');
var getPrinterConfigs = require('../tools/getPrinterConfigs');

module.exports = function serializeObject(object, filename) {

	//Create a copy of the currently opened object and apply all transformations to it
	var serializedobject = object.clone();
	serializedobject.geometry = object.geometry.clone();
	serializedobject.position.x = serializedobject.position.x;
	serializedobject.position.y = serializedobject.position.y;
	serializedobject.updateMatrix();

	serializedobject.geometry.applyMatrix(object.matrix);

	serializedobject.position.set(0, 0, 0);
	serializedobject.rotation.set(0, 0, 0);
	serializedobject.scale.set(1, 1, 1);
	serializedobject.updateMatrix();

    
    //Prepare inputs
    var printerConfigs = getPrinterConfigs();
    
	var pointList = serializedobject.geometry.attributes.position.array;

	var rvwj = generateWorkspaceFile(printerConfigs, filename, pointList);
	
	return rvwj;
}


