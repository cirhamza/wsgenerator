module.exports = function generateSlicingTaskReqBody(rvwjFilename,rvwj, supportType, printerModel,configPresetName, customConfigs = {}) {


    const SlicingTaskReqBody = {};

    const file = {
        filename: rvwjFilename,
        wsConfigs: rvwj
    }

    SlicingTaskReqBody["file"] = file;
    SlicingTaskReqBody["configFile"] = customConfigs;
    SlicingTaskReqBody["supportType"] = supportType;
    SlicingTaskReqBody["printerModel"] = printerModel;
    SlicingTaskReqBody["configPresetName"] = configPresetName;

    return JSON.stringify(SlicingTaskReqBody);
}