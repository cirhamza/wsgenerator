const Slice = require("./src/Main");

// ********************************************************************** //
// This tool: 
//      - Helps you generate a Workspace file from an STL file.
//      - Assumes the object is centralized in the workspace which means that
//        any coordinates embeded into the STL file will be ignored and reset to
//        the coordinates of the center.
//      - Generates a Workspace file for a SINGLE stl file at a time,
//        which means that - even though the Workspace file supports it - you can't
//        generate a Workspace file for two or three objects at the same time
//        using this tool. Feel free to do so manually. 
// ----------------------------------------------------------------------
// If you use use the Modifer feature, the stl_configs.json file will be used to
// get the file names of the STLs stored in '/assets/stls' due to it needing
// information about the Fill Density and the Slicing Priority. Both of which 
// are also mentionned in the stl_configs.json file. Use that file to decide 
// which STLs are modifiers and which are not.
// ----------------------------------------------------------------------
// If you don't want to use the modifiers feature. change useModifiers to false
// In that case, the stl files will be directly loaded from assets/stls without 
// the need for it to be provided with their file names. 
// ----------------------------------------------------------------------
// All resulting workspace files, will be stored in /assets/wsfiles
// ********************************************************************** //

const options = {
	useModifiers : true
};

Slice(options);