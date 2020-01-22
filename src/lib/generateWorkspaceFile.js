var THREE = require('three');

module.exports = function generateWorkspaceFile(printer, fileName, pointArray){

	//Recreate geometry from point array
	var geometry = {
		vertices: [],
		faces: []
	};

	if (pointArray && pointArray !== undefined) {

		for (let i = 0; i < pointArray.length / 3; i++) {
			const j = i * 3;
			geometry.vertices.push(
				new THREE.Vector3(
					pointArray[j],
					pointArray[j + 1],
					pointArray[j + 2]
				)
			);
		}
		for (let i = 0; i < geometry.vertices.length / 3; i++) {
			const j = i * 3;
			geometry.faces.push({
				a: j,
				b: j + 1,
				c: j + 2
			});
		}
	} else {
		throw new Error(" :::::: PointArray is not defined ::::: ");
	}

	//Main container
	var serializeContainer = {
		Printer: {
			Dummy: [
				printer.electronicVersion,
				printer.manufacturer,
				printer.model
			]
		},
		Models: [],
		SelectedSupport: "none"
	};

	//Add new model
	serializeContainer.Models.push(new Model(fileName));

	//ModelPositions
	for (let j = 0; j < geometry.vertices.length; j++) {
		computePositions(
			serializeContainer.Models[0].ModelPositions,
			geometry.vertices,
			j
		);
	}

	//ModelIndices
	for (let j = 0; j < geometry.faces.length; j++) {
		computeIndices(
			serializeContainer.Models[0].ModelIndices,
			geometry.faces,
			j
		);
	}

	//MAKE SURE TO STRINGIFY THE RVWJ HERE
	const rvwj = JSON.stringify(serializeContainer);

	return rvwj;
}

//Constructor for Model object
var Model = function(fileName) {
	this.metaData = {
		IsGroup: false,
		Path: "",
		Name: fileName,
		PrintingMaterial: 0,
		Watertight: "PerformCheck"
	};
	this.position = { X: 0, Y: 0, Z: 0 };
	this.scale = { X: 1, Y: 1, Z: 1 };
	this.rotationX = 0;
	this.rotationY = 0;
	this.rotationZ = 0;
	this.FlipedX = false;
	this.FlipedY = false;
	this.FlipedZ = false;
	this.BoundsPositions = [
		{
			X: 0,
			Y: 0,
			Z: 0
		}
	];
	this.BoundsIndices = [0];
	this.ModelPositions = [];
	this.ModelIndices = [];
};

//Procedures for generating stuff
function computeIndices(indices, faces, i) {
	indices[i * 3] = faces[i].a;
	indices[i * 3 + 1] = faces[i].b;
	indices[i * 3 + 2] = faces[i].c;
}

function computePositions(positions, vertices, i) {
	positions[i] = {
		X: vertices[i].x,
		Y: vertices[i].y,
		Z: vertices[i].z
	};
}
