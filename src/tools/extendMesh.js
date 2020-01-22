const {  Mesh, Vector3, Box3, Geometry } = require("three");

const getPrinterConfigs = require('./getPrinterConfigs');


function toRadians(deg) {
	return deg * (Math.PI / 180);
}

module.exports = function extendMesh(object) {
	////Properties
	Mesh.prototype.downZ = 0;

	////Methods
	Mesh.prototype.setPosition = function(x, y) {
		var positionLimit = this.getPositionLimit();
		if (x <= positionLimit.max.x) {
			if (x >= positionLimit.min.x) {
				this.position.x = x;
			} else {
				this.position.x = positionLimit.min.x;
			}
		} else {
			this.position.x = positionLimit.max.x;
		}

		if (y <= positionLimit.max.y) {
			if (y >= positionLimit.min.y) {
				this.position.y = y;
			} else {
				this.position.y = positionLimit.min.y;
			}
		} else {
			this.position.y = positionLimit.max.y;
		}
		this.updateBoundingBox();
		this.lift();
	};

	Mesh.prototype.setScale = function(targetScale) {
		var currentPosition = [this.position.x, this.position.y];
		var minSize = new Vector3(0.1, 0.1, 0.1);
		var maxSize = new Vector3(
			getPrinterConfigs().bed.x,
			getPrinterConfigs().bed.y,
			getPrinterConfigs().bed.z
		);
		var scaleLimit = this.getScaleLimit();
		var lastModelScale = new Vector3(
			Math.min(this.scale.x, scaleLimit.max),
			Math.min(this.scale.y, scaleLimit.max),
			Math.min(this.scale.z, scaleLimit.max)
		);

		this.setPosition(currentPosition[0], currentPosition[1]);
	};

	Mesh.prototype.setRotation = function(axis, degrees) {
		var currentScale = new Vector3(
			this.scale.x,
			this.scale.y,
			this.scale.z
		);
		var radians = toRadians(degrees);
		var currentPosition = [this.position.x, this.position.y];
		switch (axis) {
			case "x":
				object.rotateX(radians);
				break;
			case "y":
				object.rotateY(radians);
				break;
			case "z":
				object.rotateZ(radians);
				break;
			default:
				return;
		}
		this.updateBoundingBox();
		this.setScale(currentScale);
		this.setPosition(currentPosition[0], currentPosition[1]);
	};
	Mesh.prototype.lift = function() {
		var zMin = this.boundingBox.min.z;
		var zHeight = this.boundingBox.max.z - this.boundingBox.min.z;

		if (this.downZ < 0) {
			if (this.downZ < -zHeight) {
				this.downZ = -zHeight;
			}
		} else {
			this.downZ = 0;
		}
		this.position.z = this.position.z - zMin + this.downZ;
		this.updateBoundingBox();
	};
	Mesh.prototype.centerInWorkspace = function() {
		this.setPosition(getPrinterConfigs().bed.x / 2, getPrinterConfigs().bed.y / 2);
	};
	Mesh.prototype.getPositionLimit = function() {
		var positionLimit = {
			min: {
				x: 0,
				y: 0
			},
			max: {
				x: 0,
				y: 0
			}
		};
		positionLimit.min.x = this.position.x - this.boundingBox.min.x;
		positionLimit.min.y = this.position.y - this.boundingBox.min.y;

		positionLimit.max.x =
			getPrinterConfigs().bed.x - (this.boundingBox.max.x - this.position.x);
		positionLimit.max.y =
			getPrinterConfigs().bed.y - (this.boundingBox.max.y - this.position.y);

		return positionLimit;
	};
	Mesh.prototype.getCurrentSize = function() {
		return new Vector3(
			this.boundingBox.max.x - this.boundingBox.min.x,
			this.boundingBox.max.y - this.boundingBox.min.y,
			this.boundingBox.max.z - this.boundingBox.min.z
		);
	};
	Mesh.prototype.getScaleLimit = function() {
		var maxSize = new Vector3(
			getPrinterConfigs().bed.x,
			getPrinterConfigs().bed.y,
			getPrinterConfigs().bed.z
		);
		var minSize = new Vector3(1, 1, 1);
		var currentscale = new Vector3(
			this.scale.x,
			this.scale.y,
			this.scale.z
		);
		var currentSize = this.getCurrentSize();
		var scaleLimit = {};

		scaleLimit.max = Math.min(
			maxSize.x / (currentSize.x / currentscale.x),
			maxSize.y / (currentSize.y / currentscale.y),
			maxSize.z / (currentSize.z / currentscale.z)
		);

		scaleLimit.min = Math.max(
			minSize.x / (currentSize.x / currentscale.x),
			minSize.y / (currentSize.y / currentscale.y),
			minSize.z / (currentSize.z / currentscale.z)
		);

		return scaleLimit;
	};
	Mesh.prototype.updateBoundingBox = function() {
		this.boundingBox = new Box3().setFromObject(this);
	};
	Mesh.prototype.reset = function() {
		this.rotation.set(0, 0, 0);
		this.downZ = 0;
		this.updateBoundingBox();
		this.setScale(new Vector3(1, 1, 1));
		this.centerInWorkspace();
		this.lift();
	};
	Mesh.prototype.remove = function() {
		this.selected = false;
		this.geometry.dispose();
		this.geometry = new Geometry();
		this.scale.set(1, 1, 1);
		this.position.set(0, 0, 0);
		this.rotation.set(0, 0, 0);

		this.updateBoundingBox();

		document.querySelectorAll(".text-label").forEach(function(i) {
			i.outerHTML = "";
		});
	};
}
