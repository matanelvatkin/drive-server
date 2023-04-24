const { errMessage } = require("../errController");
const documentsData = require("./documents.model");
async function create(data) {
  return await documentsData.create(data);
}

async function read(filter) {
  if (filter) {
    return await documentsData.find(filter).populate("children.document");
  }
  return await documentsData.find({});
}

async function readOne(filter) {
  const res = await documentsData.findOne(filter).populate("children.document");
  if (!res) throw errMessage.DOCUMENTS_NOT_FOUND;
  return res;
}

async function update(filter, newData) {
  return await documentsData.updateOne(filter, newData).populate("children.document");
}

async function updateAndReturn(filter, newData) {
  let data = await documentsData
    .findOneAndUpdate(filter, newData, { new: true })
    .populate("document");
  if (!data) throw errMessage.DOCUMENTS_NOT_FOUND;
  return data;
}
async function del(id) {
  return await update(id, { status: "deleted" });
}

module.exports = {
  create,
  read,
  readOne,
  update,
  updateAndReturn,
  del,
};