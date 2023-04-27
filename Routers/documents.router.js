const express = require("express");
const documentRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const fs = require("fs");
const documentsServices = require("../BL/documents.services");
const { sendError } = require("../errController");

documentRouter.put("/addfile", upload.any('files'), async (req, res) => {
  try {
    console.log(req.body);
    const file = req.files[0]
    console.log(file);
    fs.renameSync(
      file.path,
      `uploads/${req.body.arrayPath
        .replace(',',"/")}/${file.originalname}`
    );
    const addFile = await documentsServices.addFile(
      req.body.id,
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
      `uploads/${req.body.arrayPath.join("/")}/${req.body.directoryName}`
    );
    const addDirectory = await documentsServices.addDirectory(
      req.body.id,
      req.body.directoryName
    );
    res.send(addDirectory);
  } catch (err) {
    sendError(res, err);
  }
});

// documentRouter.put("/delete", async (req, res) => {});
// documentRouter.put("/rename", async (req, res) => {});

documentRouter.get("/getchildren", async (req, res) => {
  try {
    const _id = req.query.dirId;
    const children = await documentsServices.getChildren({ _id });
    res.send(children);
  } catch (err) {
    sendError(res, err);
  }
});
module.exports = documentRouter;
