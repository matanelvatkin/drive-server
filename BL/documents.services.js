const documentsController = require("../DL/documents.controller");
const { checkData } = require("../errController");

const createDocuments = async (data) => {
  checkData(data, ["type", "name"]);
  const document = await documentsController.create(data);
  return document;
};
const getChildren = async (data) => {
  const document = await documentsController.findOne({
    _id: data._id,
    isActive: true,
  });
  const children = document.children;
  return children;
};
const addFile = async (_id, fileName) => {
  const document = await documentsController.updateAndReturn(
    { _id: data._id },
    {$push: {children:  { type: "file", name: fileName } } }
  );
  return document;
};
const addDirectory = async (_id, directoryName) => {
  const document = await documentsController.updateAndReturn(
    { _id: data._id },
    {$push: {children:  { type: "directory", name: directoryName } } }
  );
  return document;
};
module.exports = { createDocuments, getChildren,addFile,addDirectory};
