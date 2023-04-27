const documentsController = require("../DL/documents.controller");
const { checkData } = require("../errController");

const createDocuments = async (data) => {
  checkData(data, ["type", "name"]);
  const document = await documentsController.create(data);
  return document;
};
const getChildren = async (data) => {
  const document = await documentsController.readOne({
    _id: data._id,
    isActive: true,
  });
  const children = document.children;
  return children;
};
const addFile = async (_id, fileName) => {
  const newFile = await createDocuments({ type: "file", name: fileName });
  const document = await documentsController.updateAndReturn(
    { _id },
    { $push: { children: newFile._id } }
  );
  return document;
};
const addDirectory = async (_id, directoryName) => {
  const newDirectory = await createDocuments({ type: "directory", name: directoryName });
  const document = await documentsController.updateAndReturn(
    { _id},
    { $push: { children: newDirectory._id} }
  );
  return document;
};
module.exports = { createDocuments, getChildren, addFile, addDirectory };
