const express = require("express");
const documentRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "../uploads" });
const fs = require("fs");
const documentsServices = require("../BL/documents.services");
const { sendError } = require("../errController");

documentRouter.put("/addfile", upload.any(), async (req, res) => {
  try {
    const file = req.files;
    fs.renameSync(
      file.path,
      `uploads/${req.email}/${req.body.arrayPath
        .map((dir) => dir.name)
        .join("/")}/${file.originalname}`
    );
    const addFile = await documentsServices.addFile(
      req.body.arrayPath[arrayPath.length - 1]._id,
      file.originalname
    );
    return res.send(addFile);
  } catch (err) {
    sendError(res, err);
  }
});
documentRouter.put("/adddirectory", async (req, res) => {
  try {
    fs.mkdirSync(
      `uploads/${req.email}/${req.body.arrayPath
        .map((dir) => dir.name)
        .join("/")}/${req.body.directoryName}`
    );
    const addDirectory = await documentsServices.addDirectory(
      req.body.arrayPath[arrayPath.length - 1]._id,
      req.body.directoryName
    );
    res.send(addDirectory);
  } catch (err) {
    sendError(res, err);
  }
});
documentRouter.put("/delete", async (req, res) => {});
documentRouter.put("/rename", async (req, res) => {});
documentRouter.get("/getchildren", async (req, res) => {
  try {
    const _id = req.query.id;
    const children = await documentsServices.getChildren({ _id });
    res.send(children);
  } catch (err) {
    sendError(res, err);
  }
});
module.exports = documentRouter;
