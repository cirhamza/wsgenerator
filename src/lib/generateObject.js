const { Mesh, Vector3 } = require("three");

const parseStl = require('../tools/parseStl');
const extendMesh = require('../tools/extendMesh');

module.exports = function GenerateObject(data){
    
    //  This function serves to generate the "object" object
    //  using THREE JS's MESH 
    //  It takes in a buffer instead of a dataURI in order to 
    //  generate the object geometry 
    //  A parseStl function that is adapted from the STLLoader 
    //  is used here to load parse the buffer of the Stl file
    //  given to this function.

    let object = new Mesh();
    const arrayBuf = toArrayBuffer(data);

    //  Generate an object geometry using the array buffer generated from the stl buffer
    //  we got from the fs.readFile() function
    objectGeometry = parseStl(arrayBuf);
    
    //First we extend the Mesh constructor with our own extentions
    extendMesh();

    // Then we construct the 3d object  
    tmpObject = new Mesh(objectGeometry, {});

    //Before returning the 3d object, we centralize it in the 'virtual' workspace (as in: non existant :p )
    object = centralizeObject(tmpObject);

    return object;
}

function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

function toBuffer(ab) {
    var buf = Buffer.alloc(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}


function centralizeObject(object){

    object.up = new Vector3(0, 0, 1);
    
    object.geometry.center();
    
    object.updateBoundingBox();

    object.reset();

    return object
}